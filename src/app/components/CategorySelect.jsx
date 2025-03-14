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
  { value: "business", label: "Business" },
  { value: "science", label: "Science" },
  { value: "tech", label: "Tech" },
  { value: "travel", label: "Travel" },
  { value: "education", label: "Education" },
];

const CategorySelect = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select Category");
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();
  
  // Media queries for responsiveness
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
        {open ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
      </div>

      {open && (
        <ul style={styles.dropdownList(colorScheme, theme)}>
          {categories.slice(1).map((item) => (
            <li
              key={item.value}
              style={styles.dropdownItem(colorScheme, theme)}
              onClick={() => handleSelect(item.label)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: (colorScheme, theme, isSmallScreen, isTabletScreen) => ({
    width: isSmallScreen ? "100%" : "calc(100% - 16px)", // Adjust full width for small screens.
    margin: isSmallScreen ? "0" : "0px",
    marginTop: "-20vw", // Adjusted marginTop to move the element down
    borderRadius: isTabletScreen ? "8px" : "8px",
    backgroundColor: colorScheme === "dark" ? dark_theme.nav_link_dark_color : "#fff",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.06)",
    transition: "box-shadow 0.3s",
    zIndex: 1,
  }),
  dropdownHeader: (colorScheme, theme) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "400",
    borderBottom: `1px solid ${colorScheme === "dark" ? dark_theme.border_color : "#ddd"}`,
    color: colorScheme === "dark" ? dark_theme.main_text_color : "#333",
  }),
  selectedLabel: (colorScheme, theme) => ({
    // flexGrow: 1,
    color: colorScheme === "dark" ? dark_theme.main_text_color : "#333",
  }),
  dropdownList: (colorScheme, theme) => ({
    listStyle: "none",
    padding: "20",
    margin: "10",
    maxHeight: "200px", // Limit dropdown height for usability
    overflowY: "auto",
    borderRadius: "min(8px, 1vw)",
    backgroundColor: colorScheme === "dark" ? dark_theme.nav_link_dark_color : "#fff",
  }),
  dropdownItem: (colorScheme, theme) => ({
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight : "400",
    color: colorScheme === "dark" ? dark_theme.main_text_color : "black",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: colorScheme === "dark" ? "#555" : "#f0f0f0",
    },
  }),
};

export default CategorySelect;