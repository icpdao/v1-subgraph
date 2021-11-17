import { BigInt } from "@graphprotocol/graph-ts"
import { Factory, Deploy } from "../../generated/Factory/Factory"
import { Token, TokenMintArgs } from "../../generated/schema"
// import { ZERO_BD } from "../utils/constants"

export function handleDeploy(event: Deploy): void {
    let entity = Token.load(event.params._token.toHexString())
    let mintArgsEntity = TokenMintArgs.load(event.params._token.toHexString())

    if (entity == null) {
        entity = new Token(event.params._token.toHexString())
        entity.createdAtTimestamp = event.block.timestamp
        entity.createdAtBlockNumber = event.block.number
    }

    if (mintArgsEntity == null) {
        mintArgsEntity = new TokenMintArgs(event.params._token.toHexString())
    }

    mintArgsEntity.p = event.params._mintArgs.p
    mintArgsEntity.aNumerator = event.params._mintArgs.aNumerator
    mintArgsEntity.aDenominator = event.params._mintArgs.aDenominator
    mintArgsEntity.bNumerator = event.params._mintArgs.bNumerator
    mintArgsEntity.bDenominator = event.params._mintArgs.bDenominator
    mintArgsEntity.c = event.params._mintArgs.c
    mintArgsEntity.d = event.params._mintArgs.d
    mintArgsEntity.save()

    entity.daoID = event.params._daoID.toHexString()
    entity.name = event.params._erc20Name
    entity.symbol = event.params._erc20Symbol
    entity.owner = event.params._ownerAddress.toHexString()
    entity.lpRatio = event.params._lpRatio
    entity.lpTotalAmount = event.params._lpTotalAmount
    entity.mintArgs = mintArgsEntity.id
    entity.save()

}
