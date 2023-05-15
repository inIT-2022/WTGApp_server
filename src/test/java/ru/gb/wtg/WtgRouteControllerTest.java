package ru.gb.wtg;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;

import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import ru.gb.wtg.controllers.RouteController;

@SpringBootTest
@AutoConfigureMockMvc()
@Sql(value = {"classpath:V1_init.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"classpath:V2_init.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"classpath:V3_init.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class WtgRouteControllerTest {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    RouteController routeController;


    @Test
    public void authorityTest() throws Exception {
        this.mockMvc.perform(get("/api/v1/routes").accept(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().is(403));

    }

    @Test
    @WithUserDetails("Krolik_045")
    public void authorityTest2() throws Exception {
        this.mockMvc.perform(get("/api/v1/routes").accept(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().is(200));

    }




}
