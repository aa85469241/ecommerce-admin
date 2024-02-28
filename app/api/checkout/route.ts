import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prismadb";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(req: Request) {
    try {
        const { productInCart, user } = await req.json();

        if (!productInCart || productInCart.length === 0) {
            return new NextResponse("Cart is Empty.", { status: 400 });
        }

        if (!user) {
            return new NextResponse("UnAuthentication!!", { status: 400 })
        }

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

        productInCart.forEach((item: any) => {
            line_items.push({
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: item.product.name,
                        description: `${item.size}, ${item.color}`
                    },
                    unit_amount: item.product.price * 100,
                },
                quantity: item.quantity,
            })
        })

        const order = await prisma.order.create({
            data: {
                purchaser_id: user.id,
                purchaser_name: user.name,
                purchaser_email: user.email,
                isPaid: false,
                orderItems: {
                    create: productInCart.map((item: any) => ({
                        product: {
                            connect: {
                                id: item.product.id,
                            }
                        },
                        quantity: item.quantity,
                        size: item.size,
                        color: item.color,
                    }))
                }
            }
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            billing_address_collection: "required",
            phone_number_collection: {
                enabled: true,
            },
            shipping_address_collection: {
                allowed_countries: ['TW']
            },
            shipping_options: [
                {
                    shipping_rate: "shr_1OZoNJHIM1qJLvd6lvgjhQgO"
                }
            ],
            success_url: `${process.env.FRONTEND_WEB_URL}success`,
            // success_url: `${process.env.FRONTEND_WEB_URL}/cart?success=1`,
            cancel_url: `${process.env.FRONTEND_WEB_URL}/cancel`,
            // cancel_url: `${process.env.FRONTEND_WEB_URL}/cart?cancel=1`,
            metadata: {
                orderId: order.id
            },
        })

        return NextResponse.json({ url: session.url },
            {
                headers: corsHeaders
            });
    } catch (err) {
        console.log('[ORDERS_POST]', err);
        return new NextResponse('Network error', { status: 500 })
    }
}