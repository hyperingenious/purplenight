import { useComputedColorScheme, Title, Stack, Text, Card, Group, List, Center, ScrollArea, Mark, } from "@mantine/core";
import { motion } from "framer-motion";
import { Check, CrownCross, CrownSimple } from "@phosphor-icons/react";
import { useMediaQuery } from "@mantine/hooks";
import { cardShadows } from "@/app/utils/shadows";

function SubscriptionCard({
  title,
  price,
  icon,
  bg,
  features,
  isBigEnoughScreen,
}) {
  const colorScheme = useComputedColorScheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        miw={isBigEnoughScreen ? 300 : 265}
        ml={isBigEnoughScreen ? "sm" : 0}
        mr={!isBigEnoughScreen && "xs"}
        mt={"lg"}
        p={isBigEnoughScreen ? "xl" : "sm"}
        radius={"lg"}
        bg={bg}
        shadow={cardShadows.md}
      >
        <Group gap={"lg"}>
          <Card
            w={60}
            h={60}
            p={0}
            bg={"white"}
            shadow={cardShadows.xs}
            radius={"lg"}
          >
            <Center h={"60"}>{icon}</Center>
          </Card>
          <Stack gap={0}>
            <Title fw={500} order={3}>
              {title}
            </Title>
            <Group gap={0} m={0}>
              <Text fw={600} size="xl">
                {price}
              </Text>
            </Group>
          </Stack>
        </Group>
        <List
          mt={"md"}
          size="sm"
          center
          icon={
            <Check
              size={18}
              color={colorScheme === "dark" ? "gray" : "black"}
              weight="bold"
            />
          }
        >
          <ScrollArea w={300} h={250} scrollbars="y">
            {features.map((feature, index) => (
              <List.Item key={index} pb={"xs"}>
                {feature}
              </List.Item>
            ))}
          </ScrollArea>
        </List>
      </Card>
    </motion.div>
  );
}

const plans = [
  {
    title: "Limited",
    subscription_type: "free",
    price: (
      <Mark color="black" c={"white"}>
        &nbsp;&nbsp; FREE &nbsp; &nbsp;
      </Mark>
    ),
    icon: <CrownSimple size={28} color="#a25915" weight="fill" />,
    bg: "white",
    features: [
      "12/month blog generation",
      "Limited to 2 books",
      "5MB upload limit per book",
      "Supported formats: PDF",
      "Free content sharing",
      "Access to dark poimandres theme",
    ],
  },
  {
    title: "Avid Reader",
    subscription_type: "avid_reader",
    price: (
      <Mark color="black" c={"white"}>
        &nbsp;&nbsp; ₹49/month &nbsp; &nbsp;
      </Mark>
    ),
    icon: <CrownCross size={36} color="#edbd0c" weight="fill" />,
    bg: "white",
    features: [
      "1000 blog generation",
      ">250 books upload limit",
      "20MB upload limit per book",
      "Formats: PDF, EPUB, TXT, DOCX",
      "Listen to your blogs",
      "Unlimited content sharing",
      "Lifetime access to upcoming themes",
    ],
  },
];

function Subscription() {
  const isBigEnoughScreen = useMediaQuery("(min-width: 1150px)");
  const isSmallScreen = useMediaQuery("(max-width: 710px)");

  return (
    <>
      {!isSmallScreen && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Group justify="center" wrap="no-wrap">
            {plans.map((plan) => (
              <SubscriptionCard
                subscription_type={plan.subscription_type}
                key={plan.title}
                {...plan}
                isBigEnoughScreen={isBigEnoughScreen}
              />
            ))}
          </Group>
        </motion.div>
      )}
      {isSmallScreen && (
        <Stack>
          {plans.map((plan) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SubscriptionCard
                subscription_type={plan.subscription_type}
                {...plan}
                isBigEnoughScreen={isBigEnoughScreen}
              />
            </motion.div>
          ))}
        </Stack>
      )}
    </>
  );
}
export default Subscription;