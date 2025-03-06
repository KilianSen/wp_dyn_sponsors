import {InputSponsorConfig} from "./types";

/**
 * Default values for features (recommended)
 * **/
export const DefaultFeatures: Required<InputSponsorConfig["features"]> = {
    coloredHeadings: true,
    randomizeOrder: true,
    enableDescription: true,
    enableAffiliatedWith: true,
    enableBadge: false,
    enableHover: true,
    enableReferralUrl: true,
    deriveBadgeColorFromLevel: true,
    deriveBackgroundColorFromLevel: true,
}