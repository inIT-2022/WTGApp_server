package ru.gb.wtg;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.StreamingHttpOutputMessage;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import ru.gb.wtg.controllers.LocationController;
import ru.gb.wtg.mapAPI.MapAPIInterface;
import ru.gb.wtg.routes.Sector;
import ru.gb.wtg.services.LocationService;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

//webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT - запуск сервера с рандомным портом
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)


//@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc()
//@TestPropertySource(locations ="classpath:a__pplication-test.prop", inheritProperties = false, inheritLocations = false)
@Sql(value = {"classpath:V1_init.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"classpath:V2_init.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"classpath:V3_init.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
//@WebMvcTest(LocationController.class)
public class WtgLocationControllerTest {

//    @Value(value="${local.server.port}")
//    private int port;
//
//    @Autowired
//    private TestRestTemplate restTemplate;

//    @Test
//    public void greetingShouldReturnDefaultMessage() throws Exception {
//        assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/wtg/api/v1/locations/t",
//                String.class)).contains("Hello");
//    }

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private LocationService locationService;

    @Autowired
    private LocationController locationController;

    @MockBean
    private MapAPIInterface mapAPIService;

    @MockBean
    private Sector sector;

//    @Test
//    public void testInitController(){
//        assertThat(locationController).isNotNull();
//    }

    @Test
    public void shouldReturnDefaultMessage() throws Exception {
        this.mockMvc.perform(get("/api/v1/locations/t"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content()
                .string(containsString("Hello")));
    }

    @Test
    public void getAllLocations() throws Exception {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("page","1");
        params.add("pageSize","2");
        for (Map.Entry<String, List<String> > me :params.entrySet()  ) {
            System.out.println(me.getKey() + "  " + me.getValue());
        }

        this.mockMvc.perform(get("/api/v1/locations/").accept(MediaType.APPLICATION_JSON_UTF8)
                //.params(params)
                                .param("page","1")
                                .param("pageSize","2")
                )
                .andDo(print())
                .andExpect(status().isOk());
              //  .andExpect(content().json())


    }


    @Test
    public void getAllLocationsDeprecated() throws Exception {
//       MvcResult result = mockMvc.perform(get("/api/v1/locations/deprecated").accept(MediaType.APPLICATION_JSON)).andReturn();
//        System.out.println(result.getResponse().getContentType());
//        System.out.println(result.getResponse().getContentAsString());

        this.mockMvc.perform(get("/api/v1/locations/deprecated").accept(MediaType.APPLICATION_JSON_UTF8)
                        )
                .andDo(print())
                .andExpect(status().isOk())
          .andExpect(content().string(containsString("Памятник Героям Первой мировой войны")));


    }

    @Test
    public void getLocationId() throws Exception {
        MvcResult result = mockMvc.perform(get("/api/v1/locations/{id}", 1L).accept(MediaType.APPLICATION_JSON_UTF8)).andReturn();
        System.out.println(result.getResponse().getContentType());
        System.out.println(result.getResponse().getContentAsString());

        this.mockMvc.perform(get("/api/v1/locations/{id}",1L)
                )
                .andDo(print())
                .andExpect(status().isOk())
          .andExpect(content().json("{\"id\":1,\"title\":\"Скейт парк\",\"description\":\"Короткое описание\",\"fullDescription\":\"Полное описание\",\"address\":\"Школьный м-н, Прикубанский округ, Краснодар\",\"workTimeStart\":\"1970-01-01T09:00:00\",\"workTimeEnd\":\"1970-01-01T19:00:00\",\"workBreakStart\":null,\"workBreakEnd\":null,\"linkImage\":\"https://i0.photo.2gis.com/images/geo/0/30258560049059317_9c5d.jpg\",\"linkSite\":\"https://www.culture.ru/\",\"latitude\":45.039703,\"longitude\":39.030299}"));

    }

    @Test
    public void getLocationByTitle() throws Exception {
        this.mockMvc.perform(get("/api/v1/locations/title").accept(MediaType.APPLICATION_JSON_UTF8)
                        .param("title", "Скейт парк"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Скейт парк")));
    }

}
