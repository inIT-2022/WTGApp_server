package ru.gb.wtg.mapAPI.Yandex;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import ru.gb.wtg.mapAPI.MapAPIInterface;

import java.io.IOException;
import java.net.ProxySelector;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Component
@PropertySource("classpath:values.properties")
public class MapAPIYandex implements MapAPIInterface {

    @Value("${yandex.apiKey}")
    private String apiKey;

    @Value("${yandex.baseUrlForCoordinate}")
    private String baseUrlForCoordinate;

    @Override
    public List<Double> getCoordinateByAddress(String address) {
        String url = String.format(baseUrlForCoordinate,
                address.replace(" ", "_").replace("\"","").strip(),
                apiKey);

        //todo del
        System.out.println("++++URL " + url);

        HttpRequest request;
        HttpResponse<String> response = null;
        try {
            request = HttpRequest.newBuilder()
                    .uri(new URI(url.replace(" ", "_")))
                    .headers("Content-Type", "text/plain;charset=UTF-8")
                    .GET()
                    .build();

            response = HttpClient
                    .newBuilder()
                    .proxy(ProxySelector.getDefault())
                    .build()
                    .send(request, HttpResponse.BodyHandlers.ofString());
            //todo del
            System.out.println(response.body());

        } catch (URISyntaxException | InterruptedException | IOException e) {
            e.printStackTrace();
        }

        List<Double> coordinateList = new ArrayList<>();
        Pattern p1 = Pattern.compile("(\\\"coordinates\\\")([:][\\[])([\\d.,]*)([\\]][\\}])");
        assert response != null;
        Matcher m1 = p1.matcher(response.body());
        String strCoordinate = m1.find() ? m1.group() : "";

        Pattern p2 = Pattern.compile("[\\d.]+");
        Matcher m2 = p2.matcher(strCoordinate);
        if (m2.find()) coordinateList.add(Double.valueOf(m2.group()));

        if (m2.find()) coordinateList.add(Double.valueOf(m2.group()));

        System.out.println(coordinateList);

        return coordinateList;

//        return Arrays.stream((response.body().toString()
//                        .substring(response.body().toString().indexOf("coordinate") +14,
//                                response.body().toString().lastIndexOf("]},", response.body().toString().indexOf("coordinate") +14 + 21 )))
//                        .split(","))
//                .map( s -> {
//                    return Double.parseDouble(s);
//                }).collect(Collectors.toList());
    }

    @Override
    public List<String> getAddressByCoordinate(List<Double> coordinate) {
        return null;
    }



}
