package sfeir.petstore.configs;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

/**
 * Created by ayed.h on 09/02/2016.
 */
@Configuration
@EnableWebSecurity
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfigurations extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("user1").password("secret1").roles("ADMIN","USER")
                .and()
                .withUser("user2").password("secret2").roles("USER")
                .and()
                .withUser("user3").password("secret3").roles("USER");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.
                httpBasic().and().

                authorizeRequests().antMatchers("/login").permitAll().
                and().
                authorizeRequests().antMatchers("/api/**").fullyAuthenticated().and().

                addFilterAfter(new CsrfTokenGeneratorFilter(), CsrfFilter.class).
                csrf().csrfTokenRepository(csrfTokenRepository());

    }

    /**
     * From:
     * https://spring.io/blog/2015/01/12/the-login-page-angular-js-and-spring-security-part-ii
     *
     * The other thing we have to do on the server is tell Spring Security to expect the CSRF token in the format
     * that Angular wants to send it back (a header called “X-XRSF-TOKEN” instead of the default “X-CSRF-TOKEN”).
     * We do this by customizing the CSRF filter:
     * @return
     */
    private CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }
}
