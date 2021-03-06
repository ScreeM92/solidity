var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

var acc = web3.eth.accounts[0]; //get the first account

//Code:
/*
pragma solidity 0.4.20;

contract Pokemons {
    //a few defined pokemons
    enum Pokemon { Bulbasaur, Ivysaur, Venusaur, Charmander, Charmeleon, Charizard, Squirtle, Wartortle,
    Blastoise, Caterpie, Metapod, Butterfree, Weedle, Kakuna, Beedrill, Pidgey, Pidgeotto, Pidgeot, Rattata, Raticate,
    Spearow, Fearow, Ekans, Arbok, Pikachu, Raichu, Sandshrew, Sandslash, NidoranF, Nidorina, Nidoqueen, NidoranM }
    
    //pokemon catch event. Note the "Log" prefix, which is a standart for event names.
    event LogPokemonCaught(address indexed by, Pokemon indexed pokemon);
    
    //a pokemon can be caught at most once every 15 seconds if not caught already
    modifier canPersonCatch(address person, Pokemon pokemon){
        require(now > players[person].lastCatch + 15 seconds);
        require(!hasPokemon(person, pokemon));
        _;
    }
    
    struct Player {
        Pokemon[] pokemons;
        uint lastCatch; //timestamp
    }
    
    mapping(address => Player) players;
    
    //mapping can't take user-defined types as keys (ex. Pokemon)
    //the key is uint256, because the amount of Pokemons may increase in the future
    //and pass the uint8 range
    mapping(uint => address[]) pokemonHolders;
    
    //the hash of the pokemon holder and the pokemon is the key. This allows constant time lookup of whether a pokemon is caught by a person
    mapping(bytes32 => bool) hasPokemonMap;
    
    //returns if that person has caught a pokemon. It uses the hash of the address and the pokemon so that it can return the answer
    //without loops
    function hasPokemon(address person, Pokemon pokemon) internal view returns (bool) {
        return hasPokemonMap[keccak256(person, pokemon)];
    }
    
    function catchPokemon(Pokemon pokemon) public canPersonCatch(msg.sender, pokemon) {
        players[msg.sender].pokemons.push(pokemon);
        players[msg.sender].lastCatch = now;
        
        pokemonHolders[uint(pokemon)].push(msg.sender);
        
        hasPokemonMap[keccak256(msg.sender, pokemon)] = true;
        
        LogPokemonCaught(msg.sender, pokemon);
    }
    
    function getPokemonsByPerson(address person) public view returns (Pokemon[]) {
        return players[person].pokemons;
    }
    
    function getPokemonHolders(Pokemon pokemon) public view returns (address[]) {
        return pokemonHolders[uint(pokemon)];
    }
}
*/

//Store this contract's compiled bytecode and ABI
var abi = [{"constant":true,"inputs":[{"name":"person","type":"address"}],"name":"getPokemonsByPerson","outputs":[{"name":"","type":"uint8[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"pokemon","type":"uint8"}],"name":"getPokemonHolders","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"pokemon","type":"uint8"}],"name":"catchPokemon","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"by","type":"address"},{"indexed":true,"name":"pokemon","type":"uint8"}],"name":"LogPokemonCaught","type":"event"}];
var bytecode = "6060604052341561000f57600080fd5b61076e8061001e6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631bf132521461005c5780638675640b146100ea578063fd3c783a14610165575b600080fd5b341561006757600080fd5b610093600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061018b565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156100d65780820151818401526020810190506100bb565b505050509050019250505060405180910390f35b34156100f557600080fd5b61010e600480803560ff16906020019091905050610258565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b83811015610151578082015181840152602081019050610136565b505050509050019250505060405180910390f35b341561017057600080fd5b610189600480803560ff1690602001909190505061030a565b005b61019361068f565b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000180548060200260200160405190810160405280929190818152602001828054801561024c57602002820191906000526020600020906000905b82829054906101000a900460ff16601f81111561022657fe5b8152602001906001019060208260000104928301926001038202915080841161020d5790505b50505050509050919050565b6102606106a3565b6001600083601f81111561027057fe5b81526020019081526020016000208054806020026020016040519081016040528092919081815260200182805480156102fe57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116102b4575b50505050509050919050565b3381600f6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154014211151561035e57600080fd5b61036882826105d4565b15151561037457600080fd5b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000180548060010182816103c791906106b7565b916000526020600020906020918282040191900685909190916101000a81548160ff0219169083601f8111156103f957fe5b021790555050426000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055506001600084601f81111561045557fe5b8152602001908152602001600020805480600101828161047591906106f1565b9160005260206000209001600033909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506001600260003386604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140182601f81111561051d57fe5b60ff167f01000000000000000000000000000000000000000000000000000000000000000281526001019250505060405180910390206000191660001916815260200190815260200160002060006101000a81548160ff02191690831515021790555082601f81111561058c57fe5b3373ffffffffffffffffffffffffffffffffffffffff167f38f3d86cab42835e18b9ff5ed00cd76b722b92c435ad0d9aa170939ac7d499f560405160405180910390a3505050565b6000600260008484604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140182601f81111561062d57fe5b60ff167f01000000000000000000000000000000000000000000000000000000000000000281526001019250505060405180910390206000191660001916815260200190815260200160002060009054906101000a900460ff16905092915050565b602060405190810160405280600081525090565b602060405190810160405280600081525090565b8154818355818115116106ec57601f016020900481601f016020900483600052602060002091820191016106eb919061071d565b5b505050565b81548183558181151161071857818360005260206000209182019101610717919061071d565b5b505050565b61073f91905b8082111561073b576000816000905550600101610723565b5090565b905600a165627a7a72305820577c106c15a36487763c829a5aa542bc2930ef5dd7e3eb5a19372e05965d30520029"

//create the contract instance. We can use this instance to publish or connect to a published contract
var Contract = web3.eth.contract(abi);

//create a JS Object (key-value pairs), holding the data we need to publish our contract
var publishData = {
	"from": acc, //the account from which it will be published
	"data": bytecode,
	"gas": 4000000 //gas limit. This should be the same or lower than Ethereum's gas limit
}

//publish the contract, passing a callback that will be called twice. Once when the transaction is sent, and once when it is mined
//the first argument is the constructor argument
Contract.new(publishData, function(err, contractInstance) {
	if(!err) {
		if(contractInstance.address) { //if the contract has an address aka if the transaction is mined
			console.log("New contract address is :", contractInstance.address);
		}
	} else {
		console.error(err); //something went wrong
	}
});
