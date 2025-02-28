/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
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

import { AlertLevels, IdentifiableComponentInterface, UserstoreListResponseInterface } from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import { Field, FormValue, Forms, Validation } from "@wso2is/forms";
import { Code, Hint } from "@wso2is/react-components";
import React, { FunctionComponent, MutableRefObject, ReactElement, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { DropdownItemProps, Grid, GridColumn, GridRow } from "semantic-ui-react";
import { CreateGroupFormData, SearchGroupInterface, searchGroupList } from "../..";
import { SharedUserStoreConstants, SharedUserStoreUtils, UserStoreDetails } from "../../../core";
import { RootOnlyComponent } from "../../../organizations/components/root-only-component";
import { useGetCurrentOrganizationType } from "../../../organizations/hooks/use-get-organization-type";
import { getUserStoreList } from "../../../userstores/api/user-stores";
import { PRIMARY_USERSTORE } from "../../../userstores/constants";
import { UserStoreProperty } from "../../../userstores/models";

/**
 * Interface to capture group basics props.
 */
interface GroupBasicProps extends IdentifiableComponentInterface {
    dummyProp?: string;
    triggerSubmit: boolean;
    initialValues: any;
    onSubmit: (values: any) => void;
    userStore: string;
    setUserStore: (userStore: string) => void;
}

/**
 * Component to capture basic details of a new role.
 */
export const GroupBasicsUpdated: FunctionComponent<GroupBasicProps> = (props: GroupBasicProps): ReactElement => {

    const {
        onSubmit,
        triggerSubmit,
        initialValues,
        setUserStore,
        userStore,
        [ "data-componentid" ]: componentId
    } = props;

    const { t } = useTranslation();
    const dispatch: Dispatch = useDispatch();

    const [ userStoreOptions, setUserStoresList ] = useState([]);
    const [ isRegExLoading, setRegExLoading ] = useState<boolean>(false);
    const [ basicDetails, setBasicDetails ] = useState<any>(null);

    const { isSuperOrganization, isFirstLevelOrganization } = useGetCurrentOrganizationType();

    const groupName: MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>();

    useEffect(() => {
        getUserStores();
    }, []);

    useEffect(() => {
        if (basicDetails) {
            onSubmit({ basicDetails });
        }
    }, [ basicDetails ]);

    /**
     * The following function change of the user stores.
     *
     * @param values - contains values from form elements
     */
    const handleDomainChange = (values: Map<string, FormValue>) => {
        const domain: string = values?.get("domain")?.toString();

        setUserStore(domain);
    };

    /**
     * The following function validates role name against the user store regEx.
     */
    const validateGroupNamePattern = async (): Promise<string> => {

        let userStoreRegEx: string = "";

        if (userStore && userStore !== SharedUserStoreConstants.PRIMARY_USER_STORE.toLocaleLowerCase()) {
            await SharedUserStoreUtils.getUserStoreRegEx(userStore,
                SharedUserStoreConstants.USERSTORE_REGEX_PROPERTIES.RolenameRegEx)
                .then((response: string) => {
                    setRegExLoading(true);
                    userStoreRegEx = response;
                });
        } else {
            await SharedUserStoreUtils.getPrimaryUserStore().then((response: void | UserStoreDetails) => {
                setRegExLoading(true);
                if (response && response.properties) {
                    userStoreRegEx = response?.properties?.filter((property: UserStoreProperty) => {
                        return property.name === "RolenameJavaScriptRegEx";
                    })[ 0 ].value;
                }
            });
        }

        setRegExLoading(false);

        return new Promise((resolve: (value: string) => void, reject: (reason: string) => void) => {
            if (userStoreRegEx !== "") {
                resolve(userStoreRegEx);
            } else {
                reject("");
            }
        });
    };

    /**
     * The following function fetch the user store list and set it to the state.
     */
    const getUserStores = () => {
        const storeOptions: DropdownItemProps[] = [
            {
                key: -1,
                text: "Primary",
                value: PRIMARY_USERSTORE
            }
        ];

        let storeOption: DropdownItemProps = {
            key: null,
            text: "",
            value: ""
        };

        if (isSuperOrganization() || isFirstLevelOrganization()) {
            getUserStoreList()
                .then((response: UserstoreListResponseInterface[] | any) => {
                    if (storeOptions.length === 0) {
                        storeOptions.push(storeOption);
                    }
                    response.data.map((store: UserstoreListResponseInterface, index: number) => {
                        storeOption = {
                            key: index,
                            text: store.name,
                            value: store.name
                        };
                        storeOptions.push(storeOption);
                    }
                    );
                    setUserStoresList(storeOptions);
                });
        }

        setUserStoresList(storeOptions);
    };

    /**
     * Util method to collect form data for processing.
     *
     * @param values - contains values from form elements
     */
    const getFormValues = (values: any): CreateGroupFormData => {
        return {
            domain: userStore,
            groupName: values?.get("groupName")?.toString()
        };
    };

    return (
        <Forms
            data-componentid={ componentId }
            onSubmit={ (values: any) => {
                setBasicDetails(getFormValues(values));
            } }
            submitState={ triggerSubmit }
        >
            <Grid>
                <GridRow>
                    <RootOnlyComponent>
                        <GridColumn mobile={ 16 } tablet={ 16 } computer={ 10 }>
                            <Field
                                data-componentid={ `${ componentId }-domain-dropdown` }
                                type="dropdown"
                                label={ t("console:manage.features.roles.addRoleWizard.forms.roleBasicDetails." +
                                    "domain.label.group") }
                                name="domain"
                                children={ userStoreOptions }
                                placeholder={ t("console:manage.features.roles.addRoleWizard." +
                                    "forms.roleBasicDetails.domain.placeholder") }
                                requiredErrorMessage={ t("console:manage.features.roles.addRoleWizard.forms." +
                                    "roleBasicDetails.domain.validation.empty.group") }
                                required={ true }
                                element={ <div></div> }
                                listen={ handleDomainChange }
                                value={ initialValues?.basicDetails?.domain ?? userStoreOptions[ 0 ]?.value }
                            />
                        </GridColumn>
                    </RootOnlyComponent>
                </GridRow>
                <GridRow>
                    <GridColumn mobile={ 16 } tablet={ 16 } computer={ 10 }>
                        <Field
                            ref={ groupName }
                            data-componentid={ `${ componentId }-role-name-input` }
                            type="text"
                            name="groupName"
                            label={ t("console:manage.features.roles.addRoleWizard.forms.roleBasicDetails." +
                                "roleName.label", { type: "Group" }) }
                            placeholder={ t("console:manage.features.roles.addRoleWizard.forms." +
                                "roleBasicDetails.roleName.placeholder", { type: "group" }) }
                            required={ true }
                            requiredErrorMessage={ t("console:manage.features.roles.addRoleWizard.forms." +
                                "roleBasicDetails.roleName.validations.empty", { type: "Group" }) }
                            validation={ async (value: string, validation: Validation) => {
                                let isGroupNameValid: boolean = true;

                                await validateGroupNamePattern().then((regex: string) => {
                                    isGroupNameValid = SharedUserStoreUtils.validateInputAgainstRegEx(value, regex);
                                });

                                if (!isGroupNameValid) {
                                    validation.isValid = false;
                                    validation.errorMessages.push(t("console:manage.features.businessGroups" +
                                        ".fields.groupName.validations.invalid",
                                    { type: "group" }));
                                }

                                const searchData: SearchGroupInterface = {
                                    filter: `displayName eq  ${ userStore }/${ value }`,
                                    schemas: [
                                        "urn:ietf:params:scim:api:messages:2.0:SearchRequest"
                                    ],
                                    startIndex: 1
                                };

                                await searchGroupList(searchData).then((response: any) => {
                                    if (response?.data?.totalResults !== 0) {
                                        validation.isValid = false;
                                        validation.errorMessages.push(
                                            t("console:manage.features.roles.addRoleWizard." +
                                                "forms.roleBasicDetails.roleName.validations.duplicate",
                                            { type: "Group" }));
                                    }
                                }).catch(() => {
                                    dispatch(addAlert({
                                        description: t("console:manage.features.groups.notifications." +
                                            "fetchGroups.genericError.description"),
                                        level: AlertLevels.ERROR,
                                        message: t("console:manage.features.groups.notifications.fetchGroups." +
                                            "genericError.message")
                                    }));
                                });

                            } }
                            value={  initialValues?.basicDetails?.groupName }
                            loading={ isRegExLoading }
                        />
                        <Hint>
                            A name for the group.
                            { " " }
                            Can contain between 3 to 30 alphanumeric characters, dashes (<Code>-</Code>),{ " " }
                            and underscores (<Code>_</Code>).
                        </Hint>
                    </GridColumn>
                </GridRow>
            </Grid>
        </Forms>
    );
};
