import { CalculateMetadataFunction, Composition } from "remotion";
import { ForbizoVsMrBeast, totalFramesFor } from "./ForbizoVsMrBeast";

type Props = {
	forbizoSubs: number;
	mrBeastSubs: number;
	durationInSeconds: number;
};

const calculateMetadata: CalculateMetadataFunction<Props> = ({ props }) => {
	return {
		durationInFrames: totalFramesFor(props.durationInSeconds, 30),
	};
};

export const RemotionRoot: React.FC = () => {
	return (
		<Composition
			id="ForbizoVsMrBeast"
			component={ForbizoVsMrBeast}
			durationInFrames={1}
			calculateMetadata={calculateMetadata}
			fps={30}
			width={1080}
			height={1920}
			defaultProps={{
			  forbizoSubs: 157,
			  mrBeastSubs: 516,
			  durationInSeconds: 7,
			}}
		/>
	);
};
