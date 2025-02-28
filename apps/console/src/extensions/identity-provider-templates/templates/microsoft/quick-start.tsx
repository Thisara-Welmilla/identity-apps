/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { TestableComponentInterface } from "@wso2is/core/models";
import { GenericIcon, Heading, Link, PageHeader, Text } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Grid } from "semantic-ui-react";
import BuildLoginFlowIllustration from "./assets/build-login-flow.png";
import CustomizeStepsIllustration from "./assets/customize-steps.png";
import { 
    IdentityProviderInterface, 
    IdentityProviderTemplateInterface 
} from "../../../../features/identity-providers/models/identity-provider";
import { VerticalStepper, VerticalStepperStepInterface } from "../../../components/component-extensions";
import ApplicationSelectionModal from "../../../components/shared/application-selection-modal";

/**
 * Prop types of the component.
 */
interface MicrosoftAuthenticatorQuickStartPropsInterface extends TestableComponentInterface {
    /**
     * Identity provider object.
     */
    identityProvider: IdentityProviderInterface;
    /**
     * Identity provider template object.
     */
    template: IdentityProviderTemplateInterface;
}

/**
 * Quick start content for the Microsoft IDP template.
 *
 * @param props - Props injected into the component.
 *
 * @returns React Element
 */
const MicrosoftAuthenticatorQuickStart: FunctionComponent<MicrosoftAuthenticatorQuickStartPropsInterface> = (
    props: MicrosoftAuthenticatorQuickStartPropsInterface
): ReactElement => {

    const {
        [ "data-testid" ]: testId
    } = props;

    const { t } = useTranslation();

    const [ showApplicationModal, setShowApplicationModal ] = useState<boolean>(false);

    /**
     * Vertical Stepper steps.
     * @returns VerticalStepperStepInterface
     */
    const steps: VerticalStepperStepInterface[] = [
        {
            stepContent: (
                <>
                    <Text>
                        <Trans
                            i18nKey={
                                "extensions:develop.identityProviders.microsoft.quickStart"+
                                ".steps.selectApplication.content"
                            }
                        >
                            Choose the 
                            <Link external={ false } onClick={ () => setShowApplicationModal(true) }> application</Link>
                            for which you want to set up Microsoft login.
                        </Trans>
                    </Text>
                </>
            ),
            stepTitle: t("extensions:develop.identityProviders.microsoft.quickStart.steps.selectApplication.heading")
        },
        {
            stepContent: (
                <>
                    <Text>
                        <Trans
                            i18nKey={ 
                                "extensions:develop.identityProviders.microsoft.quickStart.steps."+ 
                                "selectDefaultConfig.content" 
                            }
                        >
                            Go to <strong>Sign-in Method</strong> tab and click on <strong>Start with default
                            configuration</strong>.
                        </Trans>
                    </Text>
                    <GenericIcon inline transparent icon={ BuildLoginFlowIllustration } size="huge"/>
                </>
            ),
            stepTitle: (
                <Trans 
                    i18nKey={
                        "extensions:develop.identityProviders.microsoft.quickStart.steps.selectDefaultConfig.heading"
                    }
                >
                    Select <strong>Start with default configuration</strong>
                </Trans>
            )
        },
        {
            stepContent: (
                <>
                    <Text>
                        <Trans
                            i18nKey={
                                "extensions:develop.identityProviders.microsoft.quickStart.steps.customizeFlow.content"
                            }
                        >
                            Continue to configure the login flow as required.
                        </Trans>
                    </Text>
                    <GenericIcon inline transparent icon={ CustomizeStepsIllustration } size="huge"/>
                </>
            ),
            stepTitle: t("extensions:develop.identityProviders.microsoft.quickStart.steps.customizeFlow.heading")
        }
    ];

    return (
        <>
            <Grid data-testid={ testId } className="authenticator-quickstart-content">
                <Grid.Row textAlign="left">
                    <Grid.Column width={ 16 }>
                        <PageHeader
                            className="mb-2"
                            title={ t("extensions:develop.identityProviders.microsoft.quickStart.heading") }
                            imageSpaced={ false }
                            bottomMargin={ false }
                        />
                        <Heading subHeading as="h6">
                            { t("extensions:develop.identityProviders.microsoft.quickStart.subHeading") }
                        </Heading>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row textAlign="left">
                    <Grid.Column width={ 16 }>
                        <VerticalStepper
                            alwaysOpen
                            isSidePanelOpen
                            stepContent={ steps }
                            isNextEnabled={ true }
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {
                showApplicationModal && (
                    <ApplicationSelectionModal
                        data-testid={ `${ testId }-application-selection-modal` }
                        open={ showApplicationModal }
                        onClose={ () => setShowApplicationModal(false) }
                        heading={
                            t("extensions:develop.identityProviders.microsoft.quickStart.addLoginModal.heading")
                        }
                        subHeading={
                            t("extensions:develop.identityProviders.microsoft.quickStart.addLoginModal.subHeading")
                        }
                    />
                )
            }
        </>
    );
};

/**
 * Default props for the component
 */
MicrosoftAuthenticatorQuickStart.defaultProps = {
    "data-testid": "microsoft-authenticator-quick-start"
};

/**
 * A default export was added to support React.lazy.
 * TODO: Change this to a named export once react starts supporting named exports for code splitting.
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 */
export default MicrosoftAuthenticatorQuickStart;
