import Container from "@/components/ui/container"
import SettingsClient from "./components/client"
import { getCurrentUser } from "@/actions/getCurrentUser"


const Settings = async () => {
    const user = await getCurrentUser();

    if (!user) return;

    return (
        <Container>
            <SettingsClient user={user} />
        </Container>
    )
}

export default Settings