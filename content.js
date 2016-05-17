var contentPort = chrome.runtime.connect({name: "contentPort"});

chrome.runtime.onConnect.addListener(function(port){

    port.onMessage.addListener(function(message) {

        if (message.method == 'getPlayers' && port.name == 'contentPort') {

            var players = [];

            $('tbody.projections-container tr').each(function() {

                var tableRow = $(this);

                var player = {

                    name: tableRow.find('td.pname').text(),
                    position: tableRow.find('td.voluntary').text(),
                    team: tableRow.find('td.suggested[data-column="team"]').text(), 
                    lineup: tableRow.find('td.order').text(),
                    fpts: parseFloat(tableRow.find('input.fpts').val())
                };

                players.push(player);
            }); 

            downloadCSV({ filename: "bat-projections.csv" });

            function convertArrayOfObjectsToCSV(args) {

                var result, ctr, keys, columnDelimiter, lineDelimiter, data;

                data = args.data || null;
                if (data == null || !data.length) {
                    return null;
                }

                columnDelimiter = args.columnDelimiter || ',';
                lineDelimiter = args.lineDelimiter || '\n';

                keys = Object.keys(data[0]);

                result = '';
                result += keys.join(columnDelimiter);
                result += lineDelimiter;

                data.forEach(function(item) {
                    
                    ctr = 0;
                    keys.forEach(function(key) {
                        if (ctr > 0) result += columnDelimiter;

                        result += item[key];
                        ctr++;
                    });
                    result += lineDelimiter;
                });

                return result;
            }

            function downloadCSV(args) {

                var data, filename, link;

                var csv = convertArrayOfObjectsToCSV({
                    
                    data: players
                });

                if (csv == null) return;

                filename = args.filename || 'export.csv';

                if (!csv.match(/^data:text\/csv/i)) {
                    csv = 'data:text/csv;charset=utf-8,' + csv;
                }
                data = encodeURI(csv);

                link = document.createElement('a');
                link.setAttribute('href', data);
                link.setAttribute('download', filename);
                link.click();
            }
        }
    });
});

// http://halistechnology.com/2015/05/28/use-javascript-to-export-your-data-as-csv/


