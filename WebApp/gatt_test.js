var TestServiceUUIDString        = '1dfc5ffc-8c6b-11ea-bc55-0242ac130003';
var TestCharacteristicUUIDString = '1dfc5ffe-8c6b-11ea-bc55-0242ac130003';
var TestService;
var TestCharacteristic;

function handleTestService(service) {
    write_log('Got Test Service... ' + TestServiceUUIDString);
    TestService = service;
    write_log('Getting Test Characteristic... ' + TestCharacteristicUUIDString);
    TestService.getCharacteristic(TestCharacteristicUUIDString)
    .then(characteristic => {
        TestCharacteristic = characteristic;
    });                
}    




function TestOnWriteButtonClick() {
    write_log('Writing to Test Char ...');

    let buffer = new ArrayBuffer(6);
    var write_data = new Uint8Array(buffer);

    var TestType        = parseInt(document.getElementById("SelectTestType").value);
    var Channel         = parseInt(document.getElementById("InputChannel").value);
    var PacketLenght    = parseInt(document.getElementById("InputPacketLenght").value);
    var PayloadType     = parseInt(document.getElementById("SelectPayloadType").value);
    var TxPower         = parseInt(document.getElementById("SelectTxPower").value);

    write_data[0] = 0               & (255); //req type 
    write_data[1] = TestType        & (255);
    write_data[2] = Channel         & (255);
    write_data[3] = PacketLenght    & (255);
    write_data[4] = PayloadType     & (255);
    write_data[5] = TxPower         & (255);
                 


    TestCharacteristic.writeValue(write_data)
    .then(_ => {
        write_log('> Test Char -> value was wrriten: ' + write_data);
    })
    .catch(error => {
        write_log('Argh! ' + error);
    });
}  