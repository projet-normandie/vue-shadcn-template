// composables/useSEO.ts
import { useHead } from '@unhead/vue'
import { computed, type ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { seoConfig } from '@/shared/config/seo.config'

interface SEOData {
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: string
    ogType?: string
    canonical?: string
    noindex?: boolean
    jsonLd?: Record<string, unknown> | null
    twitterSite?: string
    twitterCreator?: string
    locale?: string
    alternateLanguages?: Array<{
        hreflang: string
        href: string
    }>
}

export const useSEO = (seoData: ComputedRef<SEOData> | SEOData) => {
    const { locale } = useI18n()
    const route = useRoute()

    const data = computed(() => {
        // Check if seoData is a ComputedRef (has a .value property)
        return typeof seoData === 'object' && 'value' in seoData ? seoData.value : seoData
    })

    const baseUrl = seoConfig.site.url
    
    // Generate canonical URL based on current route
    const getCanonicalUrl = () => {
        if (data.value.canonical) return data.value.canonical
        
        // Remove locale prefix from path for canonical URL
        const path = route.path.replace(/^\/(fr|en)/, '') || '/'
        return `${baseUrl}${path}`
    }

    useHead({
        htmlAttrs: {
            lang: computed(() => data.value.locale || locale.value || 'fr')
        },

        title: computed(() => {
            const title = data.value.title
            const siteName = seoConfig.site.name
            return title ? `${title} | ${siteName}` : siteName
        }),

        meta: [
            // Standard meta tags
            {
                name: 'description',
                content: computed(() => data.value.description || seoConfig.site.description)
            },
            {
                name: 'keywords',
                content: computed(() => {
                    if (Array.isArray(data.value.keywords)) {
                        return data.value.keywords.join(', ')
                    }
                    return data.value.keywords || seoConfig.site.keywords
                })
            },
            {
                name: 'robots',
                content: computed(() => data.value.noindex ? 'noindex,nofollow' : 'index,follow')
            },
            {
                name: 'author',
                content: seoConfig.site.author
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0'
            },

            // Open Graph tags
            {
                property: 'og:site_name',
                content: seoConfig.site.name
            },
            {
                property: 'og:title',
                content: computed(() => data.value.title || seoConfig.site.name)
            },
            {
                property: 'og:description',
                content: computed(() => data.value.description || seoConfig.site.description)
            },
            {
                property: 'og:image',
                content: computed(() => data.value.ogImage || `${baseUrl}${seoConfig.images.defaultOgImage}`)
            },
            {
                property: 'og:image:width',
                content: seoConfig.images.ogImageDimensions.width
            },
            {
                property: 'og:image:height',
                content: seoConfig.images.ogImageDimensions.height
            },
            {
                property: 'og:image:type',
                content: seoConfig.images.ogImageDimensions.type
            },
            {
                property: 'og:type',
                content: computed(() => data.value.ogType || 'website')
            },
            {
                property: 'og:url',
                content: computed(() => getCanonicalUrl())
            },
            {
                property: 'og:locale',
                content: computed(() => data.value.locale || locale.value === 'en' ? 'en_US' : 'fr_FR')
            },

            // Twitter Card tags
            {
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            {
                name: 'twitter:site',
                content: computed(() => data.value.twitterSite || seoConfig.social.twitter.site)
            },
            {
                name: 'twitter:creator',
                content: computed(() => data.value.twitterCreator || seoConfig.social.twitter.creator)
            },
            {
                name: 'twitter:title',
                content: computed(() => data.value.title || seoConfig.site.name)
            },
            {
                name: 'twitter:description',
                content: computed(() => data.value.description || seoConfig.site.description)
            },
            {
                name: 'twitter:image',
                content: computed(() => data.value.ogImage || `${baseUrl}${seoConfig.images.defaultOgImage}`)
            },

            // Additional SEO tags
            {
                name: 'theme-color',
                content: seoConfig.theme.color
            },
            {
                name: 'msapplication-TileColor',
                content: seoConfig.theme.tileColor
            }
        ],

        link: [
            {
                rel: 'canonical',
                href: computed(() => getCanonicalUrl())
            },
            // Add alternate language links if provided
            ...(data.value.alternateLanguages?.map(alt => ({
                rel: 'alternate',
                hreflang: alt.hreflang,
                href: alt.href
            })) || [])
        ],

        script: computed(() => {
            const scripts = []
            
            // Add JSON-LD structured data
            if (data.value.jsonLd) {
                scripts.push({
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify(data.value.jsonLd, null, 2)
                })
            }

            return scripts
        })
    })
}


