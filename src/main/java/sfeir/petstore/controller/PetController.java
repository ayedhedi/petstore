package sfeir.petstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import sfeir.petstore.domain.Pet;
import sfeir.petstore.service.PetRepository;

import java.util.List;

/**
 * Created by ayed.h on 09/02/2016.
 */
@RestController
@RequestMapping("/pet")
public class PetController {

    @Autowired
    private PetRepository petRepository;

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    @PreAuthorize("hasRole(@roles.ADMIN)")
    public @ResponseBody
    List<Pet> getAll(@AuthenticationPrincipal final UserDetails user) {
        return petRepository.getAll();
    }
}
