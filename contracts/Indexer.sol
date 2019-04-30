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
        returns(string memory){
      
<<<<<<< HEAD
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
=======
            WebSite[] storage webSites = websites[_tag];
            
            string memory result;

            for(uint i = 0; i < webSites.length; i++){
                WebSite storage site = webSites[i];

                if (i == 0) {
                    string memory resultConcat = strConcat("", site.storageHash, site.tag, site.title, site.description);  
                    uint resultLenght = getStringLength(resultConcat);
                    string memory resultSlice = getSlice(2, resultLenght, resultConcat);
                    result = resultSlice;
                } else {
                    uint resultLenght = getStringLength(result);
                    string memory resultSlice = getSlice(1, resultLenght, result);
                    result = strConcat(resultSlice, site.storageHash, site.tag, site.title, site.description);   
                }            
            }

            return (result);
    }   
  
    function strConcat(string memory _a, string memory _b, string memory _c, string memory _d, string memory _e) private pure returns (string memory){
>>>>>>> f7b9704d579debc7fe1b10821676e2cdf01e4487
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        bytes memory _v = bytes(",");

<<<<<<< HEAD
        string memory abcd = new string(_ba.length + _v.length + _bb.length + _v.length + _bc.length  + _v.length + _bd.length);   
=======
        string memory abcd = new string(_ba.length + _v.length + _bb.length + _v.length + _bc.length  + _v.length + _bd.length + _v.length + _be.length);   
>>>>>>> f7b9704d579debc7fe1b10821676e2cdf01e4487

        bytes memory babcd = bytes(abcd);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcd[k++] = _ba[i];   
        babcd[k++] = _v[0];
        for (uint i = 0; i < _bb.length; i++) babcd[k++] = _bb[i];
        babcd[k++] = _v[0];
        for (uint i = 0; i < _bc.length; i++) babcd[k++] = _bc[i];
        babcd[k++] = _v[0];
<<<<<<< HEAD
        for (uint i = 0; i < _bd.length; i++) babcd[k++] = _bd[i];      
=======
        for (uint i = 0; i < _bd.length; i++) babcd[k++] = _bd[i];
        babcd[k++] = _v[0];
        for (uint i = 0; i < _be.length; i++) babcd[k++] = _be[i];        
>>>>>>> f7b9704d579debc7fe1b10821676e2cdf01e4487
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