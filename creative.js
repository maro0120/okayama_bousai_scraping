$(function() {
  $.ajax({
    url: 'http://www.bousai.pref.okayama.jp/bousai/city/?city_code=336637',
    type: 'GET',
    success: function(data) {
      // 外部ページのHTMLテキスト（ソース）を取得する
      var html_text = data.responseText;

      // HTMLテキストをjQueryオブジェクトにパースする。$.parseHTMLはパースするとき外部ページのJavaScriptを実行しない。
      var jobj = $.parseHTML(html_text);
      var content = new Array();
      var dummy = 0;
      var array = {dummy:dummy}

      var myRegexp = /<h3>避難情報<\/h3>([\s\S]*?)<h3>気象警報<\/h3>/g;
      var source = html_text.match(myRegexp);
      var myRegexp2 = /<td class="happen-date">([\s\S]*?)<\/td>/g;
      var hinanHappenDate = source.toString().match(myRegexp2);
      if (hinanHappenDate !== null){
        array.hinanHappenDate = hinanHappenDate
      }
      var myRegexp2 = /<td class="title">([\s\S]*?)<\/td>/g;
      var hinanTitle = source.toString().match(myRegexp2);
      if (hinanTitle !== null){
        array = {hinanTitle:hinanTitle};
      }
      var myRegexp2 = /<p>([\s\S]*?)<\/p>/g;
      var hinanGuideline = source.toString().match(myRegexp2);
      if (hinanGuideline !== null){
        array.hinanGuideline = hinanGuideline
    }

      var myRegexp = /<h3>気象警報<\/h3>([\s\S]*?)<h3>被害情報<\/h3>/g;
      var source = html_text.match(myRegexp);
      var myRegexp2 = /<td class="happen-date">([\s\S]*?)<\/td>/g;
      var kishoHappenDate = source.toString().match(myRegexp2);
      if (kishoHappenDate !== null){
        array.kishoHappenDate = kishoHappenDate
      }
      var myRegexp2 = /<td class="title">([\s\S]*?)<\/td>/g;
      var kishoTitle = source.toString().match(myRegexp2);
      if (kishoTitle !== null){
        array.kishoTitle = kishoTitle
      }
      var myRegexp2 = /<p>([\s\S]*?)<\/p>/g;
      var kishoGuideline = source.toString().match(myRegexp2);
      if (kishoGuideline !== null){
        array.kishoGuideline = kishoGuideline
      }

      var myRegexp = /<h3>被害情報<\/h3>([\s\S]*?)<!-- \/content -->/g;
      var source = html_text.match(myRegexp);
      var myRegexp2 = /<td class="happen-date">([\s\S]*?)<\/td>/g;
      var higaiHappenDate = source.toString().match(myRegexp2);
      if (higaiHappenDate !== null){
        array.higaiHappenDate = higaiHappenDate
      }
      var myRegexp2 = /<td class="title">([\s\S]*?)<\/td>/g;
      var higaiTitle = source.toString().match(myRegexp2);
      if (higaiTitle !== null){
        array.higaiTitle = higaiTitle
      }
      var myRegexp2 = /<p>([\s\S]*?)<\/p>/g;
      var higaiGuideline = source.toString().match(myRegexp2);
      if (higaiGuideline !== null){
        array.higaiGuideline = higaiGuideline
      }
      
      $("#hinanHappenDate").html(array.hinanHappenDate);
      $("#hinanTitle").html(array.hinanTitle);
      $("#hinanGuideline").html(array.hinanGuideline);
      $("#kishoHappenDate").html(array.kishoHappenDate);
      $("#kishoTitle").html(array.kishoTitle);
      $("#kishoGuideline").html(array.kishoGuideline);
      $("#higaiHappenDate").html(array.higaiHappenDate);
      $("#higaiTitle").html(array.higaiTitle);
      $("#higaiGuideline").html(array.higaiGuideline);

      // 外部ページから一部の要素だけ抜き出し、表示する。
      $(jobj).find('h3').each(function(){
        content.push($(this).html());
      });
      $(jobj).find('p').each(function(){
        content.push($(this).html());
      });
      $("#res").html(array.higaiGuideline);
      $("#container").html(content);
    }
  });
});