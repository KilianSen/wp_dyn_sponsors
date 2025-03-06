import {InputSponsorConfig} from "./types";

/**
 * Default values for features (recommended)
 * **/
export const DefaultFeatures: Required<InputSponsorConfig["features"]> = {
    enableColorHeadings: true,
    enableRandomizedOrder: true,
    enableDescription: true,
    enableAffiliatedWith: true,
    enableHover: true,
    enableReferralUrl: true,
    deriveBackgroundColorFromLevel: true,
    enableLogoRedirect: true,
    enableAuxiliaryLink: true,
}