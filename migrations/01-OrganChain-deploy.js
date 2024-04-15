const OrganChain = artifacts.require('OrganChain');

module.exports = async(deployer,network,address)=>{
    deployer.deploy(OrganChain,address[0]);
}