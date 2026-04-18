 export default function GradientButton({ children, onClick, fullWidth }) {
return (
<button
onClick={onClick}
style={{
width: fullWidth ? "100%" : "auto",
padding: "14px",
borderRadius: "12px",
border: "none",
background: "linear-gradient(135deg, #0f2a55, #1d4ed8)",
color: "#fff",
fontWeight: 600,
cursor: "pointer",
}}
>
{children} </button>
);
}
