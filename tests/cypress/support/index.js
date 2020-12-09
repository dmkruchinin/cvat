// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

require('./commands');
require('./commands_projects');
require('./commands_review_pipeline');
require('@cypress/code-coverage/support');

before(() => {
    if (Cypress.browser.family !== 'chromium') {
        cy.visit('/');
        cy.get('.ant-modal-body').within(() => {
            cy.get('.ant-modal-confirm-title').should('contain', 'Unsupported platform detected');
            cy.get('.ant-modal-confirm-btns').contains('OK').click();
        });
    }
});

const resizeObserverLoopErrRe = /^ResizeObserver loop limit exceeded/;
Cypress.on('uncaught:exception', (err) => {
    if (resizeObserverLoopErrRe.test(err.message)) {
        // the exception is generated by cypress in some browsers
        return false;
    }
});
