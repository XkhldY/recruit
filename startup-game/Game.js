import * as React from "react"

/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */

export default function Game() {
    const [month, setMonth] = React.useState(1)
    const [budget, setBudget] = React.useState(200000)
    const [progress, setProgress] = React.useState(0)
    const [quality, setQuality] = React.useState(50)
    const [gameOver, setGameOver] = React.useState(false)
    const [ending, setEnding] = React.useState("")
    const [showTips, setShowTips] = React.useState(false)
    // Removed showConfetti and confettiPieces state

    const initialState = {
        month: 1,
        budget: 200000,
        progress: 0,
        quality: 50,
        gameOver: false,
            ending: "",
            showTips: false
            // Removed showConfetti and confettiPieces from initial state
        };

        const resetGame = () => {
        setMonth(initialState.month);
        setBudget(initialState.budget);
        setProgress(initialState.progress);
        setQuality(initialState.quality);
        setGameOver(initialState.gameOver);
            setEnding(initialState.ending);
            setShowTips(initialState.showTips);
            // Removed showConfetti and confettiPieces reset
        };

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
        const newProgress = Math.min(100, progress + impact.progress) // Cap progress at 100
        const newQuality = Math.max(0, Math.min(100, quality + impact.quality)) // Clamp quality between 0 and 100
        const newMonth = month + 1

        setBudget(newBudget)
        setProgress(newProgress)
        setQuality(newQuality)
        setMonth(newMonth)

        // Check for game over conditions: month limit, budget depleted, OR progress reaches 100%
        if (newMonth > 6 || newBudget <= 0 || newProgress >= 100) {
                setGameOver(true)
                if (newProgress >= 100 && newQuality >= 50) {
                    setEnding("🎉 You launched your MVP like a pro!")
                    // Removed confetti logic
                } else if (newProgress >= 100) {
                    setEnding("⚠️ You launched, but your tech debt is high.")
                } else {
                setEnding("💀 You ran out of time or money before launching.")
            }
        }
    }

    return (
        <div
            style={{
                padding: 20,
                fontFamily: "Inter, sans-serif",
                backgroundColor: "#f9fafb",
                borderRadius: 12,
                maxWidth: 420,
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                position: 'relative', // Needed for confetti positioning
                overflow: 'hidden' // Keep overflow hidden in case other elements might overflow
            }}
        >
            {/* Removed confetti rendering */}

            <h2 style={{ textAlign: "center", fontSize: 24, marginBottom: 10 }}>
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
                    color: "#64748b",
                }}
            >
                You, the stressed-out founder
            </p>

            {gameOver ? (
                <div
                    style={{
                        background: "#e0f2fe",
                        padding: 20,
                        borderRadius: 10,
                        textAlign: "center",
                    }}
                >
                    <p style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>{ending}</p>

                    {/* Removed POM message tied to confetti */}

                    <ul
                        style={{
                            marginTop: 16,
                            fontSize: 13,
                            color: "#475569",
                            textAlign: "left",
                            listStyle: 'none',
                            paddingLeft: 0
                        }}
                    >
                        <li style={{ marginBottom: 4 }}>
                            {progress >= 100
                                ? "✅ Finished MVP"
                                : "❌ Didn’t finish MVP"}
                        </li>
                        <li style={{ marginBottom: 4 }}>
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
                            marginTop: 20,
                            padding: "10px 15px",
                            borderRadius: 8,
                            backgroundColor: "#9ca3af",
                            color: "#fff",
                            border: "none",
                            fontSize: 14,
                            cursor: "pointer",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                            transition: 'background-color 0.2s ease'
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#6b7280'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = '#9ca3af'}
                    >
                        🔄 Play Again
                    </button>
                </div>
            ) : (
                <div>
                    <div
                        style={{
                            marginBottom: 16,
                            display: "grid",
                            gap: 4,
                            fontSize: 14,
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
                                background: "#e5e7eb",
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
                                    transition: 'width 0.3s ease-in-out' // Smooth progress bar
                                }}
                            ></div>
                        </div>
                        <p>
                            <strong>🧪 Quality:</strong> {quality} / 100
                        </p>
                    </div>

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
                                backgroundColor: "#6366f1",
                                color: "#fff",
                                border: "none",
                                textAlign: "left",
                                fontSize: 14,
                                cursor: "pointer",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                                transition: 'background-color 0.2s ease'
                            }}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = '#4f46e5'}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = '#6366f1'}
                        >
                            <strong>{choice.label}</strong>
                            <br />
                            <span style={{ fontSize: 12, color: "#e0e7ff" }}>
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
                            color: "#475569",
                            cursor: "pointer",
                            padding: '4px 0' // Add some padding for easier clicking
                        }}
                    >
                        ℹ️ What’s the best move?
                    </button>
                    {showTips && (
                        <div
                            style={{
                                fontSize: 12,
                                background: "#fef9c3",
                                padding: 10,
                                borderRadius: 6,
                                marginTop: 8,
                                color: "#92400e",
                                border: '1px solid #fde68a'
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
            )}
        </div>
    )
}
