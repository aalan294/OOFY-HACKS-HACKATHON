// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import ERC721 token standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract OrganChain is ERC721 {
    // Define variables
    address public admin;
    uint256 public donorCounter;
    uint256 public recipientCounter;

    enum OrganStatus {Register, Available, Transplanted}
    enum RecipientStatus {Registered, Transplanted}

    struct Organ {
        uint256 id;
        address donor;
        string donorName;
        string donorAadharNumber;
        string organType;
        uint256 preservationTime;
        uint256 timestamp;
        OrganStatus status;
        address to;
    }
    struct Recipient {
        uint256 id;
        address recipient;
        string recipientName;
        string recipientAadharnumber;
        string organType;
        uint timestamp;
        RecipientStatus status;
        address from;
    }

    mapping(uint256 =>Organ) public organs;
    mapping(uint256 =>Recipient) public recipient;
    mapping(address => bool) public isHospital;

    // Events
    event StatusUpdated(uint256 indexed organId, address indexed donor, string organType);
    event OrganTransplanted(uint256 indexed organId, address indexed donor, address indexed recipient);

    // Constructor
    constructor(address _admin) ERC721("OrganChainToken", "OCT") {
        admin = _admin;
    }

    // Modifier for admin-only functions
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    // Modifier for only Hospital
    modifier onlyHospital() {
        require(isHospital[msg.sender],"Only Hospitals can call this function");
        _;
    }

    //Register Recipient
    function registerRecipient(
        string memory _recipientName,
        address _recipientAddress,
        string memory _recipientAadharNumber,
        string memory _organType
    ) external onlyHospital {
        recipientCounter++;
        recipient[recipientCounter] = Recipient(
                recipientCounter,
                _recipientAddress,
                _recipientName,
                _recipientAadharNumber,
                _organType,
                block.timestamp,
                RecipientStatus.Registered,
                0x0000000000000000000000000000000000000000
            );
    }

    // Register organ donation
    function registerOrgan(
        string memory _donorName,
        address _donorAddress,
        string memory _donorAadharNumber,
        string memory _organType
    ) external onlyHospital {
        donorCounter++;
            organs[donorCounter] = Organ(
                donorCounter,
                _donorAddress,
                _donorName,
                _donorAadharNumber,
                _organType,
                6,
                block.timestamp,
                OrganStatus.Register,
                0x0000000000000000000000000000000000000000
            );
    }

    //Register Hospital
    function registerHospital(address _hospital) external onlyAdmin{
        isHospital[_hospital] = true;
    }

    // OrganStatus Update
    function updateOrganStatus(uint256 _organId) external{
         require(organs[_organId].donor != address(0), "Organ does not exist");
         organs[_organId].status = OrganStatus.Available;
         emit StatusUpdated(_organId, organs[_organId].donor, organs[_organId].organType);
    }

    // Transplant organ
    function transplantOrgan(uint256 _organId, uint256 _recipientId ) external onlyHospital {
        require(organs[_organId].donor != address(0), "Organ does not exist");
        require(recipient[_recipientId].recipient != address(0),"Recipient does not exist");
        require(keccak256(bytes(organs[_organId].organType)) == keccak256(bytes(recipient[_recipientId].organType)),"This organ Does not match Your Requirment");
        require(organs[_organId].status == OrganStatus.Available, "Organ is not available");
        organs[_organId].status = OrganStatus.Transplanted;
        organs[_organId].to = recipient[_recipientId].recipient;
        recipient[_recipientId].status = RecipientStatus.Transplanted;
        recipient[_recipientId].from = organs[_organId].donor;
        emit OrganTransplanted(_organId,organs[_organId].donor, recipient[_recipientId].recipient);
    }

    //check isDonor
    function isDonor(address _donor)public view returns(bool){
        for(uint256 i=1; i<donorCounter + 1; i++){
            if(organs[i].donor == _donor){
                return true;
            }
        }
        return false;
    }

    // check isRecipient
    function isRecipient(address _recipient)public view returns(bool){
        for (uint i = 1; i<recipientCounter + 1; i++){
            if(recipient[i].recipient == _recipient){
                return true;
            }
        }
        return false;
    }
    

    //Get OrganId from Account Aaddress
    function getOrganId(address _donorAddress)public view  returns(uint256[] memory){
        require(isDonor(_donorAddress),"Donor not found");
        uint[] memory ids = new uint256[](donorCounter);
        uint count = 0;
        for(uint i = 1;i<donorCounter + 1;i++){
            if(organs[i].donor == _donorAddress){
                ids[count] = i;
                count++;
            }
        }
        uint256[] memory result = new uint256[](count);
        for (uint256 j = 0; j < count; j++) {
            result[j] = ids[j];
        }
        return result;
    }

    //Get RecipientId from Account Aaddress
    function getRecipientId(address _recipientAddress)public view  returns(uint256[] memory){
        require(isRecipient(_recipientAddress),"Recipient not Found");
        uint[] memory ids = new uint256[](recipientCounter);
        uint count = 0;
        for(uint i = 1;i<donorCounter + 1;i++){
            if(recipient[i].recipient == _recipientAddress){
                ids[count] = i;
                count++;
            }
        }
        uint256[] memory result = new uint256[](count);
        for (uint256 j = 0; j < count; j++) {
            result[j] = ids[j];
        }
        return result;
    }

    // Get all available organs
    function getAvailableOrgans() external view returns (Organ[] memory) {
        uint256 count = 0;
        uint256 index = 0;
        for (uint256 i=1;i<donorCounter+1;i++){
            if(organs[i].status == OrganStatus.Available){
                count++;
            }
        }
        Organ[] memory availableOrgans = new Organ[](count);
        for (uint256 i=1;i<donorCounter+1;i++){
            if(organs[i].status == OrganStatus.Available){
                availableOrgans[index] = organs[i];
                index++;
            }
        }
        return availableOrgans;
    }
    // Get all available Recipients
    function getAvailableRecipients() external view returns (Recipient[] memory) {
        uint256 count = 0;
        uint256 index = 0;
        for (uint256 i=1;i<recipientCounter+1;i++){
            if(recipient[i].status == RecipientStatus.Registered){
                count++;
            }
        }
        Recipient[] memory availableRecipients = new Recipient[](count);
        for (uint256 i=1;i<recipientCounter+1;i++){
            if(recipient[i].status == RecipientStatus.Registered){
                availableRecipients[index] = recipient[i];
                index++;
            }
        }
        return availableRecipients;
    }

   // Get All Organs Registered Available Transplanted
    function getAllOrgans()external view returns(Organ[] memory){
        uint256 index = 0;
        Organ[] memory result = new Organ[](donorCounter);
        for(uint i=1;i<donorCounter + 1; i++){
            result[index] = organs[i];
            index++;
        }
        return result;
    }

    //Get All Recipients
    function getAllRecipients()external view returns(Recipient[] memory){
        uint256 index = 0;
        Recipient[] memory result = new Recipient[](recipientCounter);
        for(uint256 i=1; i<recipientCounter + 1;i++){
            result[index] = recipient[i];
            index++;
        }
        return result;
    }
}