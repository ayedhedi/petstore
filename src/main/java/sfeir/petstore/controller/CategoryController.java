package sfeir.petstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sfeir.petstore.domain.Category;
import sfeir.petstore.service.PetRepository;

import java.util.List;

/**
 * Created by ayed.h on 09/02/2016.
 */
@RestController
@RequestMapping("/category")
public class CategoryController {


    @Autowired
    private PetRepository petRepository;

    @PreAuthorize("hasRole('ROLE_USER')")
    @RequestMapping(method = RequestMethod.GET)
    public List<Category> getAll(
            @AuthenticationPrincipal final UserDetails user
    ) {
        return petRepository.getCategories();
    }
}
