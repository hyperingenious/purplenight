"use client";
import { Modal, Stack, useComputedColorScheme } from "@mantine/core";
import { dark_theme } from "@/app/config/theme";

function ModalForm({ opened, close, title, children, status }) {
  const colorScheme = useComputedColorScheme();

  return (
    <Modal
      radius={"xl"}
      styles={{
        content: {
          maxWidth: "310px",
        },
        body: {
          background:
            colorScheme === "dark" ? dark_theme.app_bg_dark_color : "white",
          paddingTop: "2rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          paddingBottom: "2rem",
        },
        header: {
          display: "none",
        },
      }}
      opened={opened}
      onClose={status !== "pending" && close}
      title={title}
    >
      <Stack>{children}</Stack>
    </Modal>
  );
}

export default ModalForm;
