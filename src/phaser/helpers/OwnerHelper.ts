export default class OwnersHelper {
    static isOwnerPlayer = (owner: string) => {
        return owner.includes('player')
    }

    static isOwnerComputer = (owner: string) => {
        return owner.includes('computer')
    }
}