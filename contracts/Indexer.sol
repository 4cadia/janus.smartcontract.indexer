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

    function addWebSite (
        string memory _storageHash, 
        string[] memory _tags, 
        string memory _title, 
        string memory _description) public {

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

    function getWebSite(string[] memory _tags) 
        public 
        view 
        returns(string memory website){
      
        string memory result;

        for(uint a = 0; a < _tags.length; a++){

            uint[] memory index = tagToIndex[_tags[a]];

            for(uint i = 0; i < index.length; i++){
                 result = concat(result, websites[i].storageHash, websites[i].title, websites[i].description); 
            }
        }

        return result;
    }   

    function getByHash(string memory storageHash) public view returns (string memory) {
        uint index = hashToIndex[storageHash];
        Website memory website = websites[index];
        return website.title;
    }

    function getByIndex(uint index) public view returns (string memory) {
        Website memory website = websites[index];
        return website.title;
    }

   function concat(string memory _a, string memory _b, string memory _c, string memory _d) public pure returns (string memory){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _v = bytes(",");

        string memory abcd = new string(_ba.length + _v.length + _bb.length + _v.length + _bc.length  + _v.length + _bd.length);   

        bytes memory babcd = bytes(abcd);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcd[k++] = _ba[i];   
        babcd[k++] = _v[0];
        for (uint i = 0; i < _bb.length; i++) babcd[k++] = _bb[i];
        babcd[k++] = _v[0];
        for (uint i = 0; i < _bc.length; i++) babcd[k++] = _bc[i];
        babcd[k++] = _v[0];
        for (uint i = 0; i < _bd.length; i++) babcd[k++] = _bd[i];      
        return string(babcd);
    }    
    
     function getStringLength(string memory _text) private pure returns(uint){
        bytes memory btext = bytes(_text);
        return btext.length;
    }

    
    function getSlice(uint256 _begin, uint256 _end, string memory _text) private pure returns (string memory) {
        bytes memory a = new bytes(_end-_begin+1);
        for(uint i=0;i<=_end-_begin;i++){
            a[i] = bytes(_text)[i+_begin-1];
        }
        return string(a);    
    }   
}