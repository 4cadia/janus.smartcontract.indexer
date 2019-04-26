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

    function  getWebSite(string memory _tag) 
        public 
        view 
        returns(string memory website){
      
        WebSite[] storage webSites = websites[_tag];

        string memory result = strConcat("teste1","teste2","teste3","teste4");

        return (result);
    }   

    function strConcat(string memory _a, string memory _b, string memory _c, string memory _d) private pure returns (string memory){
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
}