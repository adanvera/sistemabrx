export const API_KEY = 'lxk.0f37b9290155687c6008bae8b87eda4c'

export const ALL_MINERS_DETAILS = `
    allMinersDetails(
        mpn: MiningProfileName!
        duration: IntervalInput!
        first: Int = 0
        last: Int = 0
        offset: Int = 0
        before: Cursor
        after: Cursor
    ): MinerDetailMaterializedsConnection
`;