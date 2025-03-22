import { useMediaQuery } from '@mantine/hooks';
import { Modal, Button, useMantineTheme, useComputedColorScheme, Title, Stack, Text, Card, Group, List, Center, ScrollArea, LoadingOverlay } from '@mantine/core';
import { dark_theme } from '../config/theme';
import { cardShadows } from '../utils/shadows';
import { Check, Crown, CrownCross, CrownSimple } from '@phosphor-icons/react';
import { afacad_flux, dm_sans, poppins } from '../font';
import { Carousel } from '@mantine/carousel';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';

function SubscriptionCard({ setIsAnythingLoading, subscription_type, title, price, icon, bg, features, button, isBigEnoughScreen }) {
    const colorScheme = useComputedColorScheme()
    const [isLoading, setIsLoading] = useState(false)
    const { getToken } = useAuth()

    async function initiateSubscription({ subscription_type, getToken, setIsLoading }) {
        try {
            if (subscription_type === 'free') {
                setIsLoading(false);
                setIsAnythingLoading(false);
                return;
            }

            setIsLoading(true)
            setIsAnythingLoading(true)
            const token = await getToken({ template: "supabase_2" })
            const url = `${process.env.NEXT_PUBLIC_NODE_SERVER_URL}initiate-transaction`

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"  // Add this line
                },
                body: JSON.stringify({ subscription_type })
            });


            if (!response.ok) {
                const error = await response.json();
                throw error
            }

            const responseData = await response.json()
            const payment_link = responseData.payment_link

            if (payment_link.startsWith('https://rzp.io/rzp/')) {
                window.location.href = responseData.payment_link;
            }

            setIsLoading(false)
            return
        } catch (error) {
            toast.error(error.message)
            console.error(error)
            setIsLoading(false)
            setIsAnythingLoading(false)

        }
    }


    return (
        <Card miw={isBigEnoughScreen ? 300 : 265} ml={isBigEnoughScreen ? 'sm' : 0} mr={!isBigEnoughScreen && 'xs'} mt={'lg'} p={isBigEnoughScreen ? 'xl' : 'sm'} radius={'lg'} bg={bg}>
            <Group gap={'lg'}>
                <Card w={60} h={60} p={0} bg={'white'} shadow={cardShadows.xs} radius={'lg'}>
                    <Center h={'60'}>
                        {icon}
                    </Center>
                </Card>
                <Stack gap={0}>
                    <Title fw={500} c={'white'} className={afacad_flux.className} order={3}>{title}</Title>
                    <Group gap={0} m={0}>
                        <Text className={afacad_flux.className} c={'white'} fw={600} size='xl'>{price}</Text>
                    </Group>
                </Stack>
            </Group>
            <List mt={'md'} size="sm" className={dm_sans.className} center icon={<Check size={18} color={'white'} weight="bold" />}>
                <ScrollArea w={300} h={250} scrollbars="y">
                    {features.map((feature, index) => (
                        <List.Item c={'white'} key={index} pb={'xs'}>{feature}</List.Item>
                    ))}
                </ScrollArea>
            </List>
            <Button
                loading={isLoading}
                loaderProps={{ type: 'dots' }}
                onClick={async () => await initiateSubscription({ getToken, subscription_type, setIsLoading })}
                {...button}
                mt={'md'}
                size='lg'
                fz={'md'}
                color={'black'}
                style={button.variant === 'filled' ? { boxShadow: cardShadows.xs } : {}} className={dm_sans.className} fw={900} radius={'xl'}>
                {button.text}
            </Button>
        </Card>
    );
}

const plans = [
    {
        title: "Limited",
        price: "FREE",
        subscription_type: "free",
        icon: <CrownSimple size={28} color="#a25915" weight="fill" />,
        bg: "#af6f329c",
        bg_image: "",
        features: [
            "Limited to 5 Books",
            "5MB upload limit per book",
            "Supported formats: PDF",
            "Free content sharing",
            "Access to dark poimandres theme",
        ],
        button: {
            text: "Default Active",
            disabled: true,
            variant: "outline",
        },
    },
    {
        title: "Reader",
        subscription_type: "reader",
        price: "₹49/month",
        icon: <Crown size={32} color="#9c9c9c" weight="fill" />,
        bg: "linear-gradient(156deg, #b318ff 0%, #5c16ff 100%)",
        features: [
            "300 blog generation",
            "50 book upload limit",
            "10MB upload limit per book",
            "Formats: PDF, EPUB, TXT, DOCX",
            "Listen to your blogs",
            "Unlimited content sharing",
            "Lifetime access to upcoming themes",
        ],
        button: {
            text: "Choose a plan",
            disabled: false,
            variant: "filled",
        },
    },
];


function SubscriptionModal({ opened, close }) {
    const theme = useMantineTheme();
    const colorScheme = useComputedColorScheme();
    const isBigEnoughScreen = useMediaQuery('(min-width: 1150px)');
    const [isAnythingLoading, setIsAnythingLoading] = useState(false)

    return (
        <Modal size={isBigEnoughScreen ? '45em' : '21em'} opened={opened} radius={"xl"}
            styles={{
                header: { display: "none" },
                body: {
                    padding: "0.5rem",
                    paddingBottom: "1rem",
                    background: colorScheme === "dark" ? dark_theme.app_bg_dark_color : "white",
                    paddingRight: isBigEnoughScreen ? '1.2rem' : "0.5rem",
                    paddingLeft: isBigEnoughScreen ? '1.2rem' : "0.5rem",
                },
            }}
            centered bg={theme.colors.gray[0]} onClose={close}>
            <LoadingOverlay visible={isAnythingLoading} zIndex={1000} overlayProps={{ c: 'dark', radius: "sm", blur: 2 }} />
            <Stack p={'sm'} gap={0}>
                <Title ml={'xs'} fw={500} className={poppins.className} mt={4} order={2}>Choose a plan</Title>
                <Text ml={'xs'} className={dm_sans.className} c={'dimmed'}>Select the offer that best suits your needs</Text>
                {isBigEnoughScreen ? (
                    <Group wrap='nowrap' justify='center'>
                        {plans.map(plan => (
                            <SubscriptionCard subscription_type={plan.subscription_type} setIsAnythingLoading={setIsAnythingLoading} key={plan.title} {...plan} isBigEnoughScreen={isBigEnoughScreen} />
                        ))}
                    </Group>
                ) : (
                    <Carousel style={{ cursor: 'grab' }} align={'center'} controlsOffset="0" withControls>
                        {plans.map(plan => (
                            <SubscriptionCard setIsAnythingLoading={setIsAnythingLoading} subscription_type={plan.subscription_type} key={plan.title} {...plan} isBigEnoughScreen={isBigEnoughScreen} />
                        ))}
                    </Carousel>
                )}
            </Stack>
        </Modal>
    );
}

export default SubscriptionModal;
