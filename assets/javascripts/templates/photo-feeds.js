(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['photo-feeds'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "		<img src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1.standard_resolution : stack1)) != null ? stack1.url : stack1), depth0))
    + "\" alt=\"imagem da postagem @"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.username : stack1), depth0))
    + "\">\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "		<img src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1.low_resolution : stack1)) != null ? stack1.url : stack1), depth0))
    + "\" alt=\"imagem da postagem @"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.username : stack1), depth0))
    + "\">\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<div class=\"photo\">\n	<header class=\"photo-header\">\n		<figure class=\"photo-avatar\">\n			<img src=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.profile_picture : stack1), depth0))
    + "\" alt=\"imagem de avatar\" width=\"50\">\n		</figure>\n		<h2 class=\"photo-name\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.username : stack1), depth0))
    + "</h2>\n\n		<div class=\"like\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.likes : depth0)) != null ? stack1.count : stack1), depth0))
    + "</div>\n	</header>\n\n	<figure class=\"thumbnail\">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1.standard_resolution : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "	</figure>\n</div>";
},"useData":true});
})();