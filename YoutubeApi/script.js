//Youtube open api 이용, 검색기능 사용하기
const search = document.getElementById('search');
const button = document.getElementById('button');
const v = document.getElementById('videoPlayer');
const vTitle = document.getElementById('vTitle');
const cName = document.getElementById('cName');
const date = document.getElementById('date');

var optionParams = {
	part:"snippet",
	key:"AIzaSyAcYCFJSlcnwmgS4wfyiY59_3AW0ykR1MA",
	type:"video",
	maxResults:10,
	regionCode:"KR",
	videoDuration:"short"
};

var url="https://www.googleapis.com/youtube/v3/search?";
for(var option in optionParams){
	url += option + "=" + optionParams[option] + "&"; //open api에 요청할 url값 초기화
}

button.addEventListener('click', getInputData);//검색 버튼 눌렸을 경우 getInputData 실행

function getInputData() {
  var yUrl = url;
	var name = "";
	if(search.value=="") {
		alert("검색어를 입력하세요.");
		search.focus();
		return false;//검색어가 입력되지 않았을 경우 알림창 띄우기
	} else {
    console.log(search.value);
    name = encodeURI(search.value);
    yUrl += "q=" + name;
    console.log(name);
    console.log(yUrl);//검색어가 입력되었을 경우 url에 포함시켜서 전달
	}

	sendHttpRequest('GET', yUrl);//json type으로 데이터 받아오는 함수 호출
}

function sendHttpRequest(method, url) {
  var xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.responseType = 'json';
  xhr.onload = () => {
		var data = xhr.response;
		dataList = data.items;
    jsonData = data.items[0].id.videoId;;
    console.log(jsonData);
    updateVideo(jsonData);//videoPlayer에서 재생할 video 보여주는 함수
    updateInfo(data.items[0]);//videoPlayer에서 재생할 video의 제목과 channel 보여주는 함수
    addList(dataList);//다음 비디오(upNext)의 썸네일 목록 불러오는 함수
  };
	xhr.send();
}

function updateVideo(id) {
  v.innerHTML = '<iframe src="http://www.youtube.com/embed/' + id + '?autoplay=0" style="overflow:hidden;height:400px;width:100%;" frameborder="0" allowfullscreen></iframe>';
  //open api를 통해서 받아온 video의 id를 주소와 합쳐서 iframe에 넘김
}

function updateInfo(item) {
  vTitle.innerHTML = item.snippet.title + " | " + item.snippet.description;
  //videoPlayer에서 재생할 video의 title과 description을 vTitle 자리에 출력
  cName.innerHTML = item.snippet.channelTitle;
  //channel의 name을 channel의 metadata자리에 출력하기
  date.innerHTML = item.snippet.publishTime.substr(0,10);
  //video의 업로드 시간 중 년월일 부분만을 출력
}

function addList(itemList) {
	var i;
	for(i=1; i<4; i++) {//i==0은 main player에서 재생되는 영상. 목록 업데이트는 1번부터 진행
    var item = document.getElementById("item"+i);
    var thum = document.getElementById("thum"+i);
    var title = document.getElementById("title"+i);
    var channel = document.getElementById("channel"+i);
    var thumImg = itemList[i].snippet.thumbnails.medium.url;
    thum.innerHTML = "<img src='" + thumImg + "' style='max-width: 100%; height: auto;'>";
    //다음 동영상 목록에 검색 결과로 나온 video의 썸네일 사진 출력하기
    title.innerHTML = itemList[i].snippet.title;//동영상 목록의 title 업데이트
    channel.innerHTML = itemList[i].snippet.channelTitle;//동영상 목록의 chaanel name 업데이트
    item.appendChild(thum);
	}
}

// function showVideo() {
// 	var index = $(this).parent().index();
// 	var id = dataList[index].id.videoId;
// 	v.innerHTML = '<iframe src="//www.youtube.com/embed/' + id + '?autoplay=1" width="560" height="315" frameborder="0" allowfullscreen></iframe>';
// }
