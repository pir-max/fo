import {
	AbsoluteFill,
	Easing,
	Img,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import {
	bigNumberShadow,
	blueGradient,
	cardShadow,
	labelShadow,
	pageBackground,
	profileBorder,
	profileShadow,
	redGradient,
	sizes,
	textShadow,
	vsBadgeBackground,
	vsBadgeBorder,
	vsBadgeShadow,
} from "./styles";

type Props = {
	forbizoSubs: number;
	mrBeastSubs: number;
	durationInSeconds: number;
};

export const defaultProps: Props = {
	forbizoSubs: 17,
	mrBeastSubs: 241,
	durationInSeconds: 1.2,
};

// The counter should reach its final value on the last rendered frame.
export function ForbizoVsMrBeast({
	forbizoSubs,
	mrBeastSubs,
	durationInSeconds,
}: Props) {
	const frame = useCurrentFrame();
	const { fps, width, height } = useVideoConfig();

	const counterFrames = Math.max(1, Math.round(durationInSeconds * fps));
	const counterEndFrame = Math.max(1, counterFrames - 1);

	// Image pop-in: 0 -> 0.6s, spring so it overshoots a touch like the
	// original CSS keyframes (scale 0.6 + rotate -6 -> scale 1).
	const imageSpring = spring({
		frame,
		fps,
		config: { damping: 12, stiffness: 120 },
	});
	const imageScale = interpolate(imageSpring, [0, 1], [0.6, 1]);
	const imageRotate = interpolate(imageSpring, [0, 1], [-6, 0]);
	const imageOpacity = interpolate(frame, [0, 12], [0, 1], {
		extrapolateRight: "clamp",
	});

	// Name + label fade-in: 0 -> 0.8s
	const textOpacity = interpolate(frame, [0, 24], [0, 1], {
		extrapolateRight: "clamp",
	});

	// Counter: 0 -> duration, cubic ease-out like the original rAF tween.
	// Once we pass the counter window, hold the final value.
	const easedCounter = interpolate(
		frame,
		[0, counterEndFrame],
		[0, 1],
		{
			easing: Easing.out(Easing.cubic),
			extrapolateRight: "clamp",
		},
	);
	const isFinalFrame = frame >= counterEndFrame;
	const forbizoDisplay = isFinalFrame
		? forbizoSubs
		: Math.floor(easedCounter * forbizoSubs);
	const beastDisplay = isFinalFrame
		? mrBeastSubs
		: Math.floor(easedCounter * mrBeastSubs);

	// VS badge: punch once at the start, then settle.
	// Spring with low damping peaks ~1.25x then settles, mirroring the
	// scale(1.25) -> scale(1) JS in the original.
	const vsSpring = spring({
		frame,
		fps,
		config: { damping: 6, stiffness: 220, mass: 0.6 },
	});
	// Map the spring so it peaks around frame 6 and lands at 1.
	const vsScale = interpolate(vsSpring, [0, 0.6, 1], [1, 1.25, 1]);
	const vsOpacity = interpolate(frame, [0, 6], [0, 1], {
		extrapolateRight: "clamp",
	});
	const vsGlow = interpolate(frame, [0, 9, 18], [0, 1, 0.4], {
		extrapolateRight: "clamp",
	});

	// Card sizing: vertical 9:16, centered on the canvas.
	// Use full height of the canvas and a width that keeps the ratio.
	const cardWidth = Math.round((height * 9) / 16);
	const cardLeft = Math.round((width - cardWidth) / 2);

	const sideStyle: React.CSSProperties = {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: 40,
		minHeight: 0,
	};

	return (
		<AbsoluteFill
		  style={{
		    background: pageBackground,
		    fontFamily: "Arial, system-ui, -apple-system, sans-serif",
		    scale: 1.04,
		  }}
		>
			<div
				style={{
					position: "absolute",
					left: cardLeft,
					top: 0,
					width: cardWidth,
					height,
					background: "#111",
					borderRadius: sizes.cardRadius,
					overflow: "hidden",
					boxShadow: cardShadow,
					display: "flex",
					flexDirection: "column",
				}}
			>
				{/* Top side - Forbizo (red) */}
				<div
					style={{
						...sideStyle,
						background: redGradient,
						borderBottom: `${sizes.dividerBorderWidth}px solid rgba(255, 255, 255, 0.25)`,
					}}
				>
					<Img
					  src={staticFile("f.jpg")}
					  alt="Forbizo"
					  style={{
					    width: sizes.profileSize,
					    height: sizes.profileSize,
					    borderRadius: "50%",
					    objectFit: "cover",
					    border: profileBorder,
					    boxShadow: profileShadow,
					    marginBottom: 18,
					    backgroundColor: "#333",
					    opacity: imageOpacity,
					    transform: `scale(${imageScale}) rotate(${imageRotate}deg)`,
					    translate: "-2.4px -28.8px",
					  }}
					/>
					<div
						style={{
							fontSize: sizes.nameFontSize,
							fontWeight: 800,
							letterSpacing: 1.5,
							color: "white",
							textShadow,
							whiteSpace: "nowrap",
							opacity: textOpacity,
						}}
					>
						Forbizo
					</div>
					<div
						style={{
							fontSize: sizes.subsFontSize,
							fontWeight: 900,
							color: "white",
							textShadow: bigNumberShadow,
							lineHeight: 1.1,
							marginTop: -6,
							letterSpacing: 1.5,
							minWidth: 240,
							textAlign: "center",
						}}
					>
						{forbizoDisplay}
					</div>
					<div
						style={{
							fontSize: sizes.labelFontSize,
							fontWeight: 600,
							textTransform: "uppercase",
							letterSpacing: 6,
							color: "rgba(255, 255, 255, 0.8)",
							textShadow: labelShadow,
							marginTop: 6,
							opacity: textOpacity,
						}}
					>
						Subscribers
					</div>
				</div>

				{/* VS badge - centered, sitting on the divider */}
				<div
					style={{
						position: "absolute",
						left: "50%",
						top: "50%",
						transform: `translate(-50%, -50%) scale(${vsScale})`,
						background: vsBadgeBackground,
						color: "#fff",
						fontSize: sizes.vsFontSize,
						fontWeight: 900,
						padding: "24px 54px",
						borderRadius: 60,
						border: vsBadgeBorder,
						boxShadow: `${vsBadgeShadow}, 0 0 ${vsGlow * 60}px rgba(255, 255, 255, ${vsGlow * 0.5})`,
						zIndex: 20,
						letterSpacing: 3,
						opacity: vsOpacity,
						lineHeight: 1,
					}}
				>
					VS
				</div>

				{/* Bottom side - Mr Beast (blue) */}
				<div
					style={{
						...sideStyle,
						background: blueGradient,
						borderTop: `${sizes.dividerBorderWidth}px solid rgba(255, 255, 255, 0.15)`,
					}}
				>
					<Img
						src={staticFile("b.jpg")}
						alt="Mr Beast"
						style={{
							width: sizes.profileSize,
							height: sizes.profileSize,
							borderRadius: "50%",
							objectFit: "cover",
							border: profileBorder,
							boxShadow: profileShadow,
							marginBottom: 18,
							backgroundColor: "#333",
							opacity: imageOpacity,
							transform: `scale(${imageScale}) rotate(${imageRotate}deg)`,
						}}
					/>
					<div
						style={{
							fontSize: sizes.nameFontSize,
							fontWeight: 800,
							letterSpacing: 1.5,
							color: "white",
							textShadow,
							whiteSpace: "nowrap",
							opacity: textOpacity,
						}}
					>
						Mr Beast
					</div>
					<div
						style={{
							fontSize: sizes.subsFontSize,
							fontWeight: 900,
							color: "white",
							textShadow: bigNumberShadow,
							lineHeight: 1.1,
							marginTop: -6,
							letterSpacing: 1.5,
							minWidth: 240,
							textAlign: "center",
						}}
					>
						{beastDisplay}M
					</div>
					<div
						style={{
							fontSize: sizes.labelFontSize,
							fontWeight: 600,
							textTransform: "uppercase",
							letterSpacing: 6,
							color: "rgba(255, 255, 255, 0.8)",
							textShadow: labelShadow,
							marginTop: 6,
							opacity: textOpacity,
						}}
					>
						Subscribers
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}

// Total frames match the counter window so the render ends on the final value.
export const totalFramesFor = (
	durationInSeconds: number,
	fps: number,
): number => {
	return Math.max(1, Math.round(durationInSeconds * fps));
};

ForbizoVsMrBeast.defaultProps = defaultProps;
