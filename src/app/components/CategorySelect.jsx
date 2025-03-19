import React, { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useMantineTheme, useComputedColorScheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { dark_theme } from "../config/theme";

const categories = [
  { value: "", label: "Select Category" },
  { value: "fiction", label: "Fiction" },
  { value: "non-fiction", label: "Non-fiction" },
  { value: "fantasy", label: "Fantasy" },
  { value: "mystery", label: "Mystery" },
  { value: "romance", label: "Romance" },
  { value: "biography", label: "Biography" },
  { value: "history", label: "History" },
  { value: "politics", label: "Politics" },
  { value: "science", label: "Science" },
  { value: "tech", label: "Tech" },
  { value: "travel", label: "Travel" },
];

const CategorySelect = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select Category");
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();


  const isSmallScreen = useMediaQuery("(max-width: 450px)");
  const isTabletScreen = useMediaQuery("(max-width: 767px)");

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleSelect = (label) => {
    setSelected(label);
    setOpen(false);
  };

  return (
    <div style={styles.container(colorScheme, theme, isSmallScreen, isTabletScreen)}>
      <div style={styles.dropdownHeader(colorScheme, theme)} onClick={toggleDropdown}>
        <span style={styles.selectedLabel(colorScheme, theme)}>{selected}</span>
        {open ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
      </div>

      <div
        style={{
          ...styles.dropdownList(colorScheme, theme),
          maxHeight: open ? "1000px" : "0", // Animate height
          opacity: open ? 1 : 0, // Animate opacity
          overflow: "hidden",
          transition: "max-height 0.10s ease, opacity 0.10s ease", 
        }}
      >
          {categories.slice(1).map((item) => (
            <li
              key={item.value}
              style={styles.dropdownItem(colorScheme, theme)}
              onClick={() => handleSelect(item.label)}
            >
              {item.label}
            </li>
          ))}
      </div>
    </div>
  );
};

const styles = {
  container: (colorScheme, theme, isSmallScreen, isTabletScreen) => ({
    width: isSmallScreen ? "100%" : "100%",
    margin: isSmallScreen ? "0" : "0px",
    borderRadius: isTabletScreen ? "8px" : "8px",
    backgroundColor: colorScheme === "dark" ? dark_theme.nav_link_dark_color : "#F8F9FA",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.06)",
    zIndex: 1,
    top: "2%",
  }),
  dropdownHeader: (colorScheme, theme) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "400",
    borderBottom: `1px solid ${colorScheme === "dark" ? dark_theme.border_color : "#ddd"}`,
    color: colorScheme === "dark" ? dark_theme.main_text_color : "#333",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: colorScheme === "dark" ? "#555" : "#f0f0f0",
    },
  }),
  selectedLabel: (colorScheme, theme) => ({
    flexGrow: 1,
    color: colorScheme === "dark" ? dark_theme.main_text_color : "#333",
  }),
  dropdownList: (colorScheme, theme) => ({
    listStyle: "none",
    padding: "0",
    margin: "0",
    borderRadius: "8px",
    backgroundColor: colorScheme === "dark" ? dark_theme.nav_link_dark_color : "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "absolute",
    width: "100%",
    top: "100%",
    left: "0",
    zIndex: 2,
  }),
  dropdownItem: (colorScheme, theme) => ({
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "14px",
    color: colorScheme === "dark" ? dark_theme.main_text_color : "#333",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: colorScheme === "dark" ? "#555" : "#f0f0f0",
    },
  }),
};

export default CategorySelect;