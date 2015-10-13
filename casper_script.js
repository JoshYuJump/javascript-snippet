/**
 * Created by haihuayx on 2/25/2015.
 */

var casperLabelPrefix = 'casper-label';

var casper = require('casper').create({
    // verbose: true,
    // logLevel: "debug"
});

//casper.echo("Casper CLI passed args:");
//require("utils").dump(casper.cli.args);

casper.echo("Casper CLI passed options:");
require("utils").dump(casper.cli.options);

var cap_folder = casper.cli.get("folder");
var cap_url = casper.cli.get("url");
var prefix = casper.cli.get("prefix");
var div_list = casper.cli.get("div_list");
var divs = div_list.split('+');

casper.start(cap_url, function () {
    this.echo(this.getTitle());
});

casper.then(function () {
    this.wait(15000, function () { 
        // capture the full page.
        this.capture(cap_folder + '\\' + prefix + '.jpg');
        // Compatible with prior method 
        if (div_list != '') {
            this.echo('>>> the old capture method!');
            for (var i = 0, l = divs.length; i < l; i++) {
                if (this.visible('#' + divs[i])) {
                    this.captureSelector(cap_folder + '\\' + prefix + '_' + i + '.jpg', '#' + divs[i], {
                        format: 'jpg',
                        quality: 100
                    });
                }
            }
        } else {
            this.echo('>>> capture without div specified! ');
            var canCapture = true,
                index = 1;
            while (canCapture) {
                var casperSelector = ['.', casperLabelPrefix, '-', String(index)].join('');
                this.echo('>>> casperSelector is: ' + casperSelector)
                if (this.visible(casperSelector)) {
                    this.captureSelector(cap_folder + '\\' + prefix + '_' + index + '.jpg', casperSelector, {
                        format: 'jpg',
                        quality: 100
                    });
                    this.echo('>>> capture index: ' + index + ' successfully ! ');
                } else {
                    if (index > 100) {
                        canCapture = false;
                    }    
                    this.echo('>>> stop to capture ! ');
                }
                index ++;
            }
        }        

    });
});

casper.run();
//casper.exit();
