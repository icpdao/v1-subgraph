import { BigInt } from "@graphprotocol/graph-ts"
import { Factory, Deploy } from "../../generated/Factory/Factory"
import { Token } from "../../generated/schema"
// import { ZERO_BD } from "../utils/constants"

export function handleDeploy(event: Deploy): void {
    let entity = Token.load(event.params._token.toHexString())

    if (entity == null) {
        entity = new Token(event.params._token.toHexString())
        entity.createdAtTimestamp = event.block.timestamp
        entity.createdAtBlockNumber = event.block.number
    }

    entity.daoID = event.params._daoID.toHexString()
    entity.name = event.params._erc20Name
    entity.symbol = event.params._erc20Symbol
    entity.owner = event.params._ownerAddress.toHexString()
    entity.save()

}
