import { Composition } from "remotion";
import { ForbizoVsMrBeast, totalFramesFor } from "./ForbizoVsMrBeast";

export const MyComposition: React.FC = () => {
	return (
		<Composition
			id="ForbizoVsMrBeast"
			component={ForbizoVsMrBeast}
			durationInFrames={totalFramesFor(1.2, 30)}
			fps={30}
			width={1080}
			height={1920}
			defaultProps={{
				forbizoSubs: 17,
				mrBeastSubs: 241,
				durationInSeconds: 1.2,
			}}
		/>
	);
};
