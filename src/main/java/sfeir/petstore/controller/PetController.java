package sfeir.petstore.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import sfeir.petstore.domain.Pet;
import sfeir.petstore.service.PetRepository;

import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by ayed.h on 09/02/2016.
 */
@RestController
@RequestMapping("/pet")
public class PetController {
    private static final Logger logger = Logger.getLogger(PetController.class.getName());

    @Autowired
    private PetRepository petRepository;


    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasRole('ROLE_USER')")
    public @ResponseBody
    List<Pet> getAll(
            @AuthenticationPrincipal final UserDetails user,
            HttpServletResponse response,
            HttpServletRequest request) {

        response.addHeader("Access-Control-Allow-Origin","*");
        response.addHeader("Access-Control-Allow-Methods","GET");
        response.addHeader("Access-Control-Allow-Headers","text/plain");
        response.setHeader("Cache-Control","no-cache,no-store,must-revalidate");
        response.setHeader("Pragma","no-cache");
        logger.info(request.getHeader("Origin"));
        return petRepository.getAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @PreAuthorize("hasRole('ROLE_USER')")
    public @ResponseBody
    Pet getById(@AuthenticationPrincipal final UserDetails user, @PathVariable int id) {
        return petRepository.getById(id);
    }


    @RequestMapping(method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public  @ResponseBody
    Pet addPet(@AuthenticationPrincipal final UserDetails user,
                      @RequestBody Pet pet,
                      HttpServletResponse response){
        /**
         * TODO:
         * Quick and Dirty check ---> should be more proper with bean validation
         */
        if (pet.getCategory() == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return null;
        }
        //update category with exist one
        pet.setCategory(petRepository.getCategory(pet.getCategory().getName()));
        //save the new object
        return petRepository.save(pet);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deletePet(
            @PathVariable int id,
            @AuthenticationPrincipal final UserDetails user,
            HttpServletResponse response){

        if (petRepository.getById(id) == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return ;
        }

        petRepository.removePet(id);
    }

}
