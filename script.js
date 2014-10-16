//Add functionality to the Add New Website box
$("#NewDomain")
    .attr("placeholder", "Filter your websites or add new ones (comma separated)...")
    .keyup(function() {
        var searchStr = $(this).val();
        $(".zone-row").each(function(i,e) {
            var show = true;
            if(searchStr) {
                show = $(".zone-name", this).text().indexOf(searchStr) > -1;
            }
            $(this).toggle(show);
        });
    });



//Grid quick links to: DNS, CloudFlare settings and Page Rules

//Site quick links to other areas (DNS, CloudFlare settings and Page Rules)
$ZonePicker = $("#ZonePicker,#rule-editor-websites");
if($ZonePicker.length > 0) {
    
    var currentPage = window.location.pathname;
    var qStr = window.location.search;
    
    function makeButton(text, url) {
        var selected = (url == currentPage);
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