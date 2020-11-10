package com.budgetingui.budgettool.model;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity(name = "ROLE")
@Data
public class Role implements GrantedAuthority {

    private static final long serialVersionUID = -8186644851823152209L;

    public Role (Long userId, String authority) {
        this.userId = userId;
        this.authority = authority;
    }

    @Id
    @Column(name = "ID_")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "AUTHORITY_")
    private String authority;

    @Column(name = "USERID_")
    @JoinColumn(name="ID_")
    private Long userId;

//    @ManyToOne
//    private User user

    public Role() {
    }

    public Role(String authority) {
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return authority;
    }
}
