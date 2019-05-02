pragma solidity >= 0.4.21 < 0.6.0;
pragma experimental ABIEncoderV2;

contract Indexer{

    struct Website{
        string storageHash;
        string title;
        string description;
        address owner;
    }
    
    Website[] private websites;
    
    mapping(string => uint) hashToIndex;
    
    mapping(string => uint[]) tagToIndex;

    event addWebSiteEvent(string[] _tags);

    function webSiteExists(string memory storageHash) public view returns(bool exist){
        if(websites.length == 0){
            return false;
        }

        return equal(websites[hashToIndex[storageHash]].storageHash, storageHash);
    }

    function addWebSite (
        string memory _storageHash, 
        string[] memory _tags, 
        string memory _title, 
        string memory _description) public {

        require(!webSiteExists(_storageHash), 'website exists');

        uint index = websites.push(Website({
            storageHash: _storageHash,
            title: _title,
            description: _description,
            owner: msg.sender
        })) -1;

        hashToIndex[_storageHash] = index;

        for(uint i = 0; i < _tags.length; i++){
            tagToIndex[_tags[i]].push(index);
        }

        emit addWebSiteEvent(_tags);
    }

    function getWebSite(
        string[] memory _tags) 
        public 
        view 
        returns(string[15] memory){
      
        string[15] memory result;

        for(uint a = 0; a < _tags.length; a++){

            uint[] memory index = tagToIndex[_tags[a]];

            uint k = 0;

            for(uint i = 0; i < index.length; i++){
                 result[k] = concat(websites[index[i]].storageHash, websites[index[i]].title, websites[index[i]].description); 
                 k++;
            }
        }

        return result;
    }   

   function concat(string memory _a, string memory _b, string memory _c) private pure returns (string memory){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _v = bytes(";");

        string memory abcd = new string(_ba.length + _v.length + _bb.length + _v.length + _bc.length);   

        bytes memory babcd = bytes(abcd);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcd[k++] = _ba[i];   
        babcd[k++] = _v[0];
        for (uint i = 0; i < _bb.length; i++) babcd[k++] = _bb[i];
        babcd[k++] = _v[0];
        for (uint i = 0; i < _bc.length; i++) babcd[k++] = _bc[i];
        return string(babcd);
    }    

     function compare(string memory _a, string memory _b) private pure returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        for (uint i = 0; i < minLength; i ++)
            if (a[i] < b[i])
                return -1;
            else if (a[i] > b[i])
                return 1;
        if (a.length < b.length)
            return -1;
        else if (a.length > b.length)
            return 1;
        else
            return 0;
    }

    function equal(string memory _a, string memory _b) private pure returns (bool) {
        return compare(_a, _b) == 0;
    }
}