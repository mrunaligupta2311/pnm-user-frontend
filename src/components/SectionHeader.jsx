import { typography } from "../styles/theme";

export default function SectionHeader({ title }) {
  return <h3 style={typography.subtitle}>{title}</h3>;
}