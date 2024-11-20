import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'

export const publicRoutes = [
    {
        key: 'login',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: React.lazy(() => import('views/auth-views/authentication/login')),
    },
    {
        key: 'login-1',
        path: `${AUTH_PREFIX_PATH}/login-1`,
        component: React.lazy(() => import('views/auth-views/authentication/login-1')),
    },
    {
        key: 'login-2',
        path: `${AUTH_PREFIX_PATH}/login-2`,
        component: React.lazy(() => import('views/auth-views/authentication/login-2')),
    },
    {
        key: 'register-1',
        path: `${AUTH_PREFIX_PATH}/register-1`,
        component: React.lazy(() => import('views/auth-views/authentication/register-1')),
    },
    {
        key: 'register-2',
        path: `${AUTH_PREFIX_PATH}/register-2`,
        component: React.lazy(() => import('views/auth-views/authentication/register-2')),
    },
    {
        key: 'forgot-password',
        path: `${AUTH_PREFIX_PATH}/forgot-password`,
        component: React.lazy(() => import('views/auth-views/authentication/forgot-password')),
    },
    {
        key: 'error-page-1',
        path: `${AUTH_PREFIX_PATH}/error-page-1`,
        component: React.lazy(() => import('views/auth-views/errors/error-page-1')),
    },
    {
        key: 'error-page-2',
        path: `${AUTH_PREFIX_PATH}/error-page-2`,
        component: React.lazy(() => import('views/auth-views/errors/error-page-2')),
    },
]

export const protectedRoutes = [
    {
        key: 'dashboard.default',
        path: `${APP_PREFIX_PATH}/dashboard`,
        component: React.lazy(() => import('views/app-views/dashboards/default')),
    },
    {
        key: 'dashboard.analytic',
        path: `${APP_PREFIX_PATH}/app-users`,
        component: React.lazy(() => import('views/app-views/dashboards/analytic')),
    },
    {
        key: 'dashboard.sales',
        path: `${APP_PREFIX_PATH}/events`,
        component: React.lazy(() => import('views/app-views/dashboards/sales')),
    },
    //master role access
    {
        key:'role.master',
        path: `${APP_PREFIX_PATH}/role-master`,
        component: React.lazy(() => import('views/app-views/role-master/RoleMaster')),
    },
    {
        key:'admin.users',
        path: `${APP_PREFIX_PATH}/admin-users`,
        component: React.lazy(() => import('views/app-views/admin-users/AdminUsers')),
    },
    {
        key:'event.category',
        path: `${APP_PREFIX_PATH}/event-category`,
        component: React.lazy(() => import('views/app-views/event-category/EventCategory')),
    },
    {
        key: 'apps',
        path: `${APP_PREFIX_PATH}/apps`,
        component: React.lazy(() => import('views/app-views/apps')),
    },
    {
        key: 'apps.mail',
        path: `${APP_PREFIX_PATH}/apps/mail/*`,
        component: React.lazy(() => import('views/app-views/apps/mail')),
    },
    {
        key: 'apps.chat',
        path: `${APP_PREFIX_PATH}/apps/chat/*`,
        component: React.lazy(() => import('views/app-views/apps/chat')),
    },
   
    {
        key: 'apps.project',
        path: `${APP_PREFIX_PATH}/apps/project`,
        component: React.lazy(() => import('views/app-views/apps/project')),
    },
    {
        key: 'apps.project.list',
        path: `${APP_PREFIX_PATH}/apps/project/list`,
        component: React.lazy(() => import('views/app-views/apps/project/project-list/ProjectList')),
    },
    {
        key: 'apps.project.scrumboard',
        path: `${APP_PREFIX_PATH}/apps/project/scrumboard`,
        component: React.lazy(() => import('views/app-views/apps/project/scrumboard')),
    },
    {
        key: 'apps.ecommerce',
        path: `${APP_PREFIX_PATH}/apps/ecommerce`,
        component: React.lazy(() => import('views/app-views/apps/e-commerce')),
    },
    {
        key: 'apps.ecommerce.add-product',
        path: `${APP_PREFIX_PATH}/apps/ecommerce/add-product`,
        component: React.lazy(() => import('views/app-views/apps/e-commerce/add-product')),
    },
    {
        key: 'apps.ecommerce.edit-product',
        path: `${APP_PREFIX_PATH}/apps/ecommerce/edit-product/:id`,
        component: React.lazy(() => import('views/app-views/apps/e-commerce/edit-product')),
    },
    {
        key: 'apps.ecommerce.product-list',
        path: `${APP_PREFIX_PATH}/apps/ecommerce/product-list`,
        component: React.lazy(() => import('views/app-views/apps/e-commerce/product-list')),
    },
    {
        key: 'apps.ecommerce.orders',
        path: `${APP_PREFIX_PATH}/apps/ecommerce/orders`,
        component: React.lazy(() => import('views/app-views/apps/e-commerce/orders')),
    },
    
    {
        key: 'login-1',
        path: `${APP_PREFIX_PATH}/login-1`,
        component: React.lazy(() => import('views/auth-views/authentication/login-1')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'login-2',
        path: `${APP_PREFIX_PATH}/login-2`,
        component: React.lazy(() => import('views/auth-views/authentication/login-2')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'register-1',
        path: `${APP_PREFIX_PATH}/register-1`,
        component: React.lazy(() => import('views/auth-views/authentication/register-1')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'register-2',
        path: `${APP_PREFIX_PATH}/register-2`,
        component: React.lazy(() => import('views/auth-views/authentication/register-2')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'forgot-password',
        path: `${APP_PREFIX_PATH}/forgot-password`,
        component: React.lazy(() => import('views/auth-views/authentication/forgot-password')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'error-page-1',
        path: `${APP_PREFIX_PATH}/error-page-1`,
        component: React.lazy(() => import('views/auth-views/errors/error-page-1')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'error-page-2',
        path: `${APP_PREFIX_PATH}/error-page-2`,
        component: React.lazy(() => import('views/auth-views/errors/error-page-2')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'pages',
        path: `${APP_PREFIX_PATH}/pages`,
        component: React.lazy(() => import('views/app-views/pages')),
    },
    {
        key: 'pages.profile',
        path: `${APP_PREFIX_PATH}/pages/profile`,
        component: React.lazy(() => import('views/app-views/pages/profile')),
    },
    {
        key: 'pages.invoice',
        path: `${APP_PREFIX_PATH}/pages/invoice`,
        component: React.lazy(() => import('views/app-views/pages/invoice')),
    },
    {
        key: 'pages.pricing',
        path: `${APP_PREFIX_PATH}/pages/pricing`,
        component: React.lazy(() => import('views/app-views/pages/pricing')),
    },
    {
        key: 'pages.faq',
        path: `${APP_PREFIX_PATH}/pages/faq`,
        component: React.lazy(() => import('views/app-views/pages/faq')),
    },
    {
        key: 'pages.setting',
        path: `${APP_PREFIX_PATH}/pages/setting/*`,
        component: React.lazy(() => import('views/app-views/pages/setting')),
    },
    {
        key: 'pages.user-list',
        path: `${APP_PREFIX_PATH}/pages/user-list`,
        component: React.lazy(() => import('views/app-views/pages/user-list')),
    }
]