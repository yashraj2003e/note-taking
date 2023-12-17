import { useEffect, useState } from "react";

function HeadingNode() {
  const [heading, setHeading] = useState("Edit This Text");
  const [isEnabled, setIsEnabled] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    if (isEnabled) {
      setIsButtonVisible(true);
    }
  }, [isEnabled]);

  const style = {
    width: `${heading.length}ch`,
  };

  return (
    <div
      className="heading-node"
      onMouseEnter={() => setIsButtonVisible(true)}
      onMouseLeave={() => {
        if (isEnabled) return;
        setIsButtonVisible((value) => !value);
      }}
    >
      <div className="inputs">
        <button
          type="submit"
          onClick={() => setIsEnabled((value) => !value)}
          style={{ visibility: isButtonVisible ? "unset" : "hidden" }}
        >
          {!isEnabled ? "Edit" : "Save ✅"}
        </button>

        {isEnabled ? (
          <input
            disabled={!isEnabled}
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            style={style}
          ></input>
        ) : (
          <h1>{heading}</h1>
        )}
      </div>
    </div>
  );
}

export default HeadingNode;
