function Star({ star }: { star: number }) {
  
  const getRatingStars = (star: number) => {
    const fullStars = Math.floor(star); // Full stars count
    const halfStar = star % 1 !== 0; // Whether a half star is needed
    const stars = [];
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span
          key={`full-${i}`}
          className="text-yellow-300 text-2xl"
          style={{ verticalAlign: 'middle' }}
        >
          &#9733; {/* Unicode for full star */}
        </span>
      );
    }
    // Add half star
    if (halfStar) {
      stars.push(
        <span
          key="half"
          className="relative inline-block text-2xl"
          style={{ verticalAlign: 'middle', width: '1em', lineHeight: 0 }}
        >
          {/* Left-filled star */}
          <span
            className="absolute text-yellow-300 overflow-hidden"
            style={{
              width: '48%',
              height: '100%',
              left: 0,
              top: 0,
              whiteSpace: 'nowrap',
              lineHeight: 1,
            }}
          >
            &#9733;
          </span>
          {/* Empty star for the right half */}
          <span
            className="text-white"
            style={{
              lineHeight: 1,
              display: 'inline-block',
            }}
          >
            &#9733;
          </span>
        </span>
      );
    }
    return stars;
  };
  return (
    <div>
      <span>{getRatingStars(star)}</span>
    </div>
  );
}
export default Star;
