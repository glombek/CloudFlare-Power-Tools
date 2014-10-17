function filterGrid(input, rowSelector, valueSelector) {
    var searchStr = $(input).val();
        $(rowSelector).each(function(i,e) {
            var show = true;
            if(searchStr) {
                show = $(valueSelector, this).text().indexOf(searchStr) > -1;
            }
            $(this).toggle(show);
        });
}

//Add functionality to the Add New Website box
$("#NewDomain")
    .attr("placeholder", "Filter your websites or add new ones (comma separated)...")
    .keyup(function() {
        filterGrid(this, ".zone-row", ".zone-name");
    });

//Add filter to DNS page
$DnsEditor= $("#DnsEditor");
if($DnsEditor.length > 0) {
    var dnsFilter = $("<input type=\"search\" results=\"5\" autosave=\"dnspagefilter\" placeholder=\"Filter your DNS records.\"  />");
    dnsFilter.one("keyup", function() {
            //load all rows
                    var lastRows = 0;
            function scrollToBottom() {
                    if(lastRows != $(".record-row").length) {
                        lastRows = $(".record-row").length;
                        window.scrollTo(0, $(document).height());
                        setTimeout(scrollToBottom, 100);
                    }
                else {
                    window.scrollTo(0, dnsFilter.offset().top);
                   filterGrid(dnsFilter, ".record-row", ".value-pane.name");
                    function filtChange() {
                        filterGrid(dnsFilter, ".record-row", ".value-pane.name");
                    }
                    $(dnsFilter).keyup(filtChange).change(filtChange);
                }
            }
            scrollToBottom();
        });
        
        
    $DnsEditor.before(dnsFilter);
}


//Grid quick links to: DNS, CloudFlare settings and Page Rules

//Site quick links to other areas (DNS, CloudFlare settings and Page Rules)
$ZonePicker = $("#ZonePicker,#rule-editor-websites");
if($ZonePicker.length > 0) {
    
    var currentPage = window.location.pathname;
    var qStr = window.location.search;
    
    function makeButton(text, url) {
        var selected = (url == currentPage) || (url + ".html" == currentPage);
        url += qStr;
        return $("<a class=\"button " + (selected ? "green" : "blue") + " mini\" href=\"" + url + "\"><span class=\"label\">" + text + "</span></a> ");
    }
    
    var cfSettings = makeButton("CloudFlare", "/cloudflare-settings");
    var dnsSettings = makeButton("DNS", "/dns-settings");
    var pageRules = makeButton("Rules", "/page-rules");
    
    $ZonePicker
        .before(dnsSettings)
        .before(cfSettings)
        .before(pageRules);
}