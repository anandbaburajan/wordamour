function MeshGradientBackground(props) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Ensure background is behind content
        backgroundColor: "#D9FDF5",
        backgroundImage: `
                    radial-gradient(circle at 72% 83%, hsla(78,86%,75%,1) 0px, transparent 50%),
                    radial-gradient(circle at 0% 30%, hsla(66,95%,82%,1) 0px, transparent 50%),
                    radial-gradient(circle at 41% 26%, hsla(166,90%,92%,1) 0px, transparent 50%),
                    radial-gradient(circle at 41% 51%, hsla(81,91%,70%,1) 0px, transparent 50%),
                    radial-gradient(circle at 41% 88%, hsla(66,95%,82%,1) 0px, transparent 50%),
                    radial-gradient(circle at 76% 73%, hsla(81,91%,70%,1) 0px, transparent 50%),
                    radial-gradient(circle at 29% 37%, hsla(166,90%,92%,1) 0px, transparent 50%)`,
        backgroundSize: "150% 150%",
      }}
    ></div>
  );
}
export default MeshGradientBackground;
