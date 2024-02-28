import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET_KEY!,
        )
    }
    catch (err: any) {
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
    }

    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;
            const address = session?.customer_details?.address;
            const addressComponents = [
                address?.postal_code,
                address?.country,
                address?.city,
                address?.line1,
                address?.line2,
            ]
            const addressString = addressComponents.filter(s => s !== null).join(', ');

            await prisma.order.update({
                where: {
                    id: session?.metadata?.orderId,
                },
                data: {
                    isPaid: true,
                    address: addressString,
                    phone: session?.customer_details?.phone || '',
                },
                include: {
                    orderItems: true,
                }
            })
        }
    }

    return new NextResponse(null, { status: 200 });
}