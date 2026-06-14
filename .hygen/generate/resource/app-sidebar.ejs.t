---
inject: true
to: src/components/app-sidebar.tsx
before: sidebar-menu-items
---
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.includes(
                          "/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>"
                        )}
                      >
                        <Link href="/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>">
                          {t("common:navigation.<%= h.inflection.humanize(h.inflection.camelize(h.inflection.pluralize(name), true)) %>")}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>