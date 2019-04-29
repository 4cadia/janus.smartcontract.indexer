pragma solidity >=0.4.21 < 0.6.0;
pragma experimental ABIEncoderV2;

contract Indexer{

    struct WebSite{
        string storageHash;
        string tag;
        string title;
        string description;
    }

    mapping(string => WebSite[]) websites;

    event addWebSiteEvent(string _tag);

    function addWebSite (
        string memory _storageHash, 
        string memory _tag, 
        string memory _title, 
        string memory _description) public {

        websites[_tag].push(WebSite({
            storageHash: _storageHash,
            tag: _tag,
            title: _title,
            description: _description
        }));

        emit addWebSiteEvent(_tag);
    }

    function getWebSite(string memory _tag) 
        public 
        view 
        returns(string memory){
      
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
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        bytes memory _v = bytes(",");

        string memory abcd = new string(_ba.length + _v.length + _bb.length + _v.length + _bc.length  + _v.length + _bd.length + _v.length + _be.length);   

        bytes memory babcd = bytes(abcd);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcd[k++] = _ba[i];   
        babcd[k++] = _v[0];
        for (uint i = 0; i < _bb.length; i++) babcd[k++] = _bb[i];
        babcd[k++] = _v[0];
        for (uint i = 0; i < _bc.length; i++) babcd[k++] = _bc[i];
        babcd[k++] = _v[0];
        for (uint i = 0; i < _bd.length; i++) babcd[k++] = _bd[i];
        babcd[k++] = _v[0];
        for (uint i = 0; i < _be.length; i++) babcd[k++] = _be[i];        
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