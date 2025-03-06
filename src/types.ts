import {DeepRequired} from "./utils";

/**
 * This represents the structure of the input json config.
 *
 * Resolution Order: Level > Sponsor
 */
export type InputSponsorConfig = {

    /**
     * This is a list of teams that can be affiliated with sponsors.
     */
    teams?: {
        /**
         * Key: Team Name
         * e.g. "Team A", "Team B"
         */
        [key: string]: {
            /**
             * The link to the team's website.
             */
            href?: string,

            /**
             * The link to the team's logo.
             */
            img?: string,
        }
    },

    /**
     * This is a list of levels that can be assigned to sponsors.
     */
    levels?: {
        /**
         * Key: Level Name
         * e.g. "Platinum", "Gold", "Silver", "Bronze"
         */
        [key: string]: {
            /**
             * The color of the level.
             * This can be used to color the heading and the border of the detail card.
             */
            color?: string,
        }
    },

    /**
     * A linear list of distinct sponsors.
     */
    sponsors?: {
        /**
         * Key: Sponsor Name
         * e.g. "Sponsor A", "Sponsor B"
         */
        [key: string]: {
            /**
             * The link to the sponsor's logo.
             */
            img?: string,

            /**
             * The link to the sponsor's website.
             */
            href?: string,

            /**
             * The list of teams that the sponsor is affiliated with.
             * Use the key of the team in the teams list.
             */
            affiliatedWith?: (keyof InputSponsorConfig["teams"])[]

            /**
             * The level of the sponsor.
             * Use the key of the level in the levels list.
             */
            level?: (keyof InputSponsorConfig["levels"]),

            /**
             * The description of the sponsor.
             * This will be displayed in the detail card.
             */
            description?: string,

            /**
             * The definition of an auxiliary link in the detail card.
             */
            auxiliaryLink?: {
                /**
                 * The link to the auxiliary page.
                 */
                href?: string,
                /**
                 * The text to display for the auxiliary link.
                 */
                text?: string,
            },

            /**
             * The background color of the detail card.
             * This will override the level color.
             */
            backgroundColor?: string,

            /**
             * The color of the badge.
             * This will override the level color.
             */
            badgeColor?: string,
        }
    },

    /**
     * This is a list of features that can be enabled or disabled.
     * All features have a default values.
     */
    features?: {
        /**
         * Enables/Disables the coloring of the headings based on the level color.
         * @default true
         */
        enableColorHeadings?: boolean,

        /**
         * Enables/Disables the randomization of the order in which sponsors are displayed.
         * @default false
         */
        enableRandomizedOrder?: boolean,

        /**
         * Enables/Disables the display of the description field in the detail card.
         * @default true
         */
        enableDescription?: boolean,

        /**
         * Enables/Disables the display of the affiliatedWith field in the detail card.
         * @default true
         */
        enableAffiliatedWith?: boolean,

        /**
         * Enables/Disables the detail card on hover.
         * @default true
         */
        enableHover?: boolean,

        /**
         * Enables/Disables a redirect to the sponsor's referral link when clicking on the Visit Sponsor in the detail card.
         * Note: This will only work if a href is provided for the sponsor.
         *
         * @default true
         */
        enableReferralUrl?: boolean,

        /**
         * Enables/Disables a redirect to the sponsor's website when clicking on the logo in the detail card.
         * Note: This will only work if enableReferralUrl is also enabled and a href is provided for the sponsor.
         *
         * @default true
         */
        enableLogoRedirect?: boolean

        /**
         * Enables/Disables the definition and display of an auxiliary link in the detail card.
         *
         * @default false
         */
        enableAuxiliaryLink?: boolean,

        /**
         * Enables/Disables the display of a badge in the detail card.
         *
         * @default true
         */
        deriveBackgroundColorFromLevel?: boolean,
    }
}

/**
 * This represents the structure of the parsed json config.
 */
export type StructuredSponsorData = {
    structure: {
        [key in keyof InputSponsorConfig["levels"]]: { // level
            [key in keyof InputSponsorConfig["sponsors"]]: // sponsor
                Required<Omit<InputSponsorConfig["sponsors"][keyof InputSponsorConfig["sponsors"]], "level">>
        }
    },
    features: Required<InputSponsorConfig["features"]>,
} & DeepRequired<Omit<InputSponsorConfig, "sponsors" | "features">>;