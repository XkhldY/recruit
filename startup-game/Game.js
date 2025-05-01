
import React from 'react';

/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function Game() { // Added export default
    const [month, setMonth] = React.useState(1)
    const [budget, setBudget] = React.useState(200000)
    const [progress, setProgress] = React.useState(0)
    const [quality, setQuality] = React.useState(50)
    const [gameOver, setGameOver] = React.useState(false)
    const [ending, setEnding] = React.useState("")
    const [showTips, setShowTips] = React.useState(false)
    // Removed confetti state

    const choices = [
        {
            label: "🧑‍💼 Hire Locally",
            impact: { budget: -50000, progress: 10, quality: 10 },
            description: "Slow but high quality",
        },
        {
            label: "👨‍💻 Hire Freelancers",
            impact: { budget: -20000, progress: 20, quality: -10 },
            description: "Fast & cheap, but risky",
        },
        {
            label: "🚀 Hire POM Devs",
            impact: { budget: -30000, progress: 25, quality: 5 },
            description: "Smart, fast & reliable",
        },
    ]

    const getAvatarMood = () => {
        if (budget <= 0) return "😵"
        if (progress >= 100 && quality >= 50) return "😎"
        if (progress >= 100 && quality < 50) return "😬"
        if (progress > 50) return "😅"
        if (month > 4 && progress < 50) return "😭"
        return "🧐"
    }

    const makeChoice = (impact) => {
        const newBudget = budget + impact.budget
        const newProgress = progress + impact.progress
        const newQuality = quality + impact.quality
        const newMonth = month + 1

        setBudget(newBudget)
        setProgress(newProgress)
        setQuality(newQuality)
        // Check for game over conditions *before* setting state for the next turn
        let isGameOver = false;
        let endMessage = "";

        if (newProgress >= 100) {
            isGameOver = true;
            if (newQuality >= 50) {
                endMessage = "🎉 You launched your MVP like a pro!";
            } else {
                endMessage = "⚠️ You launched, but your tech debt is high.";
            }
        } else if (newBudget <= 0) {
            isGameOver = true;
            endMessage = "💀 You ran out of money before launching.";
        } else if (newMonth > 6) {
            isGameOver = true;
            endMessage = "💀 You ran out of time before launching.";
        }

        // Update state
        setBudget(newBudget)
        setProgress(newProgress)
        setQuality(newQuality)
        setMonth(newMonth)

        if (isGameOver) {
            setGameOver(true);
            setEnding(endMessage);
        }
    }

    const resetGame = () => {
        setMonth(1)
        setBudget(200000)
        setProgress(0)
        setQuality(50)
        setGameOver(false)
        setEnding("")
        setShowTips(false)
    }

    // Determine content based on game state
    let gameContent;
    if (gameOver) {
        gameContent = (
            <div
                style={{
                    background: "#f3f4f6", // Change container background to light gray
                    padding: 20,
                    borderRadius: 10,
                    textAlign: "center",
                    marginTop: 16, // Added margin
                }}
            >
                <p style={{ fontSize: 18, marginBottom: 16, color: "#1f2937" }}>{ending}</p> {/* Added dark text color */}
                {/* Final status summary */}
                     <ul
                        style={{
                            marginBottom: 16, // Added margin
                            fontSize: 13,
                            color: "#1f2937", // Ensure list text is dark gray
                            textAlign: "center", // Changed from left to center
                            listStyle: 'none',
                            paddingLeft: 0
                        }}
                >
                    <li>
                        {progress >= 100
                            ? "✅ Finished MVP"
                            : "❌ Didn’t finish MVP"}
                    </li>
                    <li>
                        {quality >= 50
                            ? "✅ Solid Codebase"
                            : "⚠️ Low Tech Quality"}
                    </li>
                    <li>
                        {budget > 0
                            ? "💰 Still Cash in the Bank"
                            : "💸 Burned Out"}
                    </li>
                </ul>
                <button
                    onClick={resetGame}
                    style={{
                        // Removed marginTop: 16
                        padding: "10px 15px",
                        borderRadius: 6,
                        backgroundColor: "#4f46e5", // Use main button color for background
                        color: "#f9fafb", // Use light text color for contrast
                        border: "none",
                        fontSize: 14,
                        cursor: "pointer",
                        display: "block",
                        width: "100%",
                    }}
                >
                    🔄 Reset Game
                </button>
            </div>
        );
    } else {
        gameContent = (
            <div>
                {choices.map((choice, idx) => (
                    <button
                        key={idx}
                        onClick={() => makeChoice(choice.impact)}
                        style={{
                            display: "block",
                            marginBottom: 12,
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: 8,
                            backgroundColor: "#4f46e5", // Slightly darker purple button
                            color: "#f9fafb", // Lighter text on button
                            border: "none",
                            textAlign: "center", // Changed from left to center
                            fontSize: 14,
                            cursor: "pointer",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)", // Adjusted shadow for dark theme
                        }}
                    >
                        <strong>{choice.label}</strong>
                        <br />
                        <span style={{ fontSize: 12, color: "#d1d5db" }}> {/* Lighter description text */}
                            {choice.description}
                        </span>
                    </button>
                ))}
                <button
                        onClick={() => setShowTips(!showTips)}
                        style={{
                            marginTop: 8,
                            background: "transparent",
                            border: "none",
                            fontSize: 13,
                            color: "#9ca3af", // Lighter gray for tips button text
                            cursor: "pointer",
                            width: "100%", // Added width
                            textAlign: "center", // Added text align center
                        }}
                    >
                        ℹ️ What’s the best move?
                </button>
                {showTips && (
                    <div
                        style={{
                            fontSize: 12,
                            background: "#374151", // Darker gray background for tips
                            padding: 10,
                            borderRadius: 6,
                            marginTop: 8,
                            color: "#f3f4f6", // Light gray text for tips
                            textAlign: "center", // Added center alignment
                        }}
                    >
                        Freelancers = cheap but risky.
                        <br />
                        Local = expensive and slow.
                        <br />
                        POM = fast, high-quality, lower cost.
                    </div>
                )}
            </div>
        );
    }


    return (
        <div
            style={{
                padding: 20,
                fontFamily: "Inter, sans-serif",
                backgroundColor: "#1f2937", // Darker gray container background
                    color: "#e5e7eb", // Light gray text for container
                    borderRadius: 12,
                    width: 360, // Reverted width back to original
                    // Removed minHeight from outer container
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                position: 'relative',
            }}
        >
            {/* Removed confetti rendering */}
            <h2 style={{ textAlign: "center", fontSize: 24, marginBottom: 10, color: "#f9fafb" }}> {/* Lighter title */}
                Startup Hiring Game
            </h2>

            <p style={{ fontSize: 48, textAlign: "center", marginBottom: 8 }}>
                {getAvatarMood()}
            </p>
            <p
                style={{
                    textAlign: "center",
                    marginBottom: 20,
                    fontSize: 14,
                    color: "#d1d5db", // Lighter description text
                }}
            >
                You, the stressed-out founder
            </p>

            {/* Stats always visible */}
            <div
                style={{
                    marginBottom: 16,
                    display: "grid",
                    gap: 4,
                    fontSize: 14,
                    textAlign: "center", // Added center alignment
                    color: "#e5e7eb", // Light stats text
                }}
            >
                <p>
                    <strong>📆 Month:</strong> {month} / 6
                </p>
                <p>
                    <strong>💰 Budget:</strong> $
                    {budget.toLocaleString()}
                </p>
                <p>
                    <strong>📈 Progress:</strong> {progress}%
                </p>
                <div
                    style={{
                        background: "#4b5563", // Darker gray progress bar background
                        height: 8,
                        borderRadius: 4,
                        overflow: "hidden",
                        marginBottom: 8,
                    }}
                >
                    <div
                        style={{
                            width: `${progress}%`,
                            backgroundColor: "#4f46e5",
                            height: "100%",
                        }}
                    ></div>
                </div>
                <p>
                    <strong>🧪 Quality:</strong> {quality} / 100
                </p>
            </div>

            {/* Render the determined game content within a wrapper for consistent height */}
            <div style={{ minHeight: 280 }}> {/* Added wrapper with minHeight */}
              {gameContent}
            </div>

        </div> // Closing tag for main component div
    ); // Closing parenthesis for return
} // Closing brace for Game function
